<script lang="ts">
    import {GM_getValue, GM_setValue} from "$";
    import {getBroadcastData} from "./lib/play";
    import {getBalloonData} from "./lib/balloon/get-balloon-data";
    import {getAfhelperData} from "./lib/helper/get-afhelper-data";
    import {BALLOON_DATA, TEMP_START_TIME} from "./lib/balloon/constants";
    import {BROADCASTER_ID} from "./constants";
    import {HELPER_DATA} from "./lib/helper/constants";
    import type {BalloonData, HelperData} from "./types";
    import DownloadCollpase from "./DownloadCollpase.svelte";

    const currentSite = location.host + location.pathname
    const isBalloon = currentSite === 'point.afreecatv.com/Balloon/AfreecaNormalExchange.asp'
    const isHelper = currentSite === 'afreehp.kr/setup/alertlist'

    let broadcastId = GM_getValue(BROADCASTER_ID, '')
    let balloonData = GM_getValue(BALLOON_DATA, null) as BalloonData | null
    let helperData = GM_getValue(HELPER_DATA, null) as HelperData | null

    async function onStart() {
        if (isHelper) {
            getAfhelperData()

            helperData = GM_getValue(HELPER_DATA, null)

            return
        }

        if (isBalloon) {
            GM_setValue(BROADCASTER_ID, broadcastId)

            const startTime = await getBroadcastData(broadcastId)

            if (!startTime) {
                console.error('방송 시작 시간을 찾을 수 없습니다.')
                return
            }

            GM_setValue(TEMP_START_TIME, startTime)

            getBalloonData()

            balloonData = GM_getValue(BALLOON_DATA, null)

            return
        }
    }
</script>

<dialog class="daisy-modal" id="app_modal">
    <div class="daisy-modal-box">
        <div class="flex flex-col gap-4">
            {#if isBalloon}
                <h3 class="font-bold text-lg">방송국 ID 입력</h3>
                <input type="text" placeholder="방송국 ID" class="daisy-input daisy-input-bordered w-full max-w-xs" bind:value={broadcastId}>
            {/if}
            {#if isBalloon || isHelper}
                <button class="daisy-btn daisy-btn-primary" on:click={onStart}>가져오기 시작</button>
            {/if}
            <DownloadCollpase bind:balloonData bind:helperData />
        </div>
    </div>
    <form class="daisy-modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>
