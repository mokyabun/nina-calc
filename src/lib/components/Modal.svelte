<script lang="ts">
    import {GM_getValue, GM_setValue} from "$";
    import {BROADCASTER_ID, TEMP_START_TIME} from "../constants";
    import {AF_BALLOON_DATA, HELPER_DATA} from "../constants";
    import {getAfHpBalloon} from "../afhelper";
    import {getAfBalloon} from "../afballoon";
    import type {BalloonSaveData} from "../../types";
    import {getStreamStartTime} from "../stream-info";
    import DownloadCollpase from "./DownloadCollpase.svelte";
    import dayjs from "dayjs";

    const currentSite = location.host + location.pathname
    const isHelper = currentSite === 'afreehp.kr/setup/alertlist'
    const isBalloon = currentSite === 'point.afreecatv.com/Balloon/AfreecaNormalExchange.asp'

    let broadcastId = GM_getValue(BROADCASTER_ID, '')
    let afData = GM_getValue(AF_BALLOON_DATA, null) as BalloonSaveData | null
    let afhpData = GM_getValue(HELPER_DATA, null) as BalloonSaveData | null

    async function onStartClick() {
        GM_setValue(BROADCASTER_ID, broadcastId)
        let startTime = await getStreamStartTime(broadcastId)

        if (!startTime) {
            const ok = prompt('해당 라이버가 방송중이 아니거나 시간을 가져올 수 없습니다. 수동으로 입력해주세요.', dayjs().format('YYYY-MM-DD HH:mm:ss'))

            if (ok) {
                startTime = ok
            } else {
                return
            }
        }

        // Reverify
        if (!dayjs(startTime).isValid()) {
            alert('시간을 잘못 입력하셨습니다. 다시 입력해주세요.')
            return
        }

        if (isHelper) {
            // Get data
            getAfHpBalloon(startTime)

            // Re Get data
            afhpData = GM_getValue(HELPER_DATA, null)
        }

        else if (isBalloon) {
            GM_setValue(TEMP_START_TIME, startTime)

            getAfBalloon()

            afData = GM_getValue(AF_BALLOON_DATA, null)
        }
    }
</script>

<dialog class="daisy-modal" id="app_modal">
    <div class="daisy-modal-box">
        <div class="flex flex-col gap-4">
            {#if isBalloon || isHelper}
                <h3 class="font-bold text-lg">방송국 ID 입력</h3>
                <input type="text" placeholder="방송국 ID" class="daisy-input daisy-input-bordered w-full max-w-xs" bind:value={broadcastId}>
                <button class="daisy-btn daisy-btn-primary" on:click={onStartClick}>가져오기 시작</button>
            {/if}
            <DownloadCollpase bind:afData={afData} bind:afhpData={afhpData} />
        </div>
    </div>
    <form class="daisy-modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>
