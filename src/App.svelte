<script lang="ts">
    import {GM_getValue, GM_setValue} from "$";
    import {playService} from "./lib/play.service";
    import {balloonService} from "./lib/balloon/balloon.service";
    import {helperService} from "./lib/helper/helper.service";
    import {BALLOON_DATA, TEMP_START_TIME} from "./lib/balloon/balloon.constants";
    import {BROADCASTER_ID} from "./constants";
    import {HELPER_DATA} from "./lib/helper/helper.constants";
    import {balloonToExcel, toExcel} from "./lib/converter.service";
    import {downloadExcel} from "./lib/downloader.service";
    import {mixData} from "./lib/mixer.service";

    const currentSite = location.host + location.pathname
    const isBalloon = currentSite === 'point.afreecatv.com/Balloon/AfreecaNormalExchange.asp'
    const isHelper = currentSite === 'afreehp.kr/setup/alertlist'

    let balloonData: BalloonData | null = GM_getValue(BALLOON_DATA, null)
    let helperData: HelperData | null = GM_getValue(HELPER_DATA, null)

    let broadcastId = GM_getValue(BROADCASTER_ID, '')

    async function onStart() {
        if (isHelper) {
            helperService()

            helperData = GM_getValue(HELPER_DATA, null)

            return
        }

        if (isBalloon) {
            GM_setValue(BROADCASTER_ID, broadcastId)

            const startTime = await playService(broadcastId)

            console.log(startTime)

            if (!startTime) {
                alert('방송 시작 시간을 찾을 수 없습니다.')
                return
            }

            GM_setValue(TEMP_START_TIME, startTime)

            balloonService()

            balloonData = GM_getValue(BALLOON_DATA, null)

            return
        }
    }

    function downloadBalloon() {
        if (balloonData === null) {
            console.error('별풍선 데이터가 없습니다.')
            return
        }

        const excel = balloonToExcel(balloonData)

        if (!excel) {
            console.error('별풍선 데이터 변환에 실패했습니다.')
            return
        }

        downloadExcel(excel, `${broadcastId}-balloon-${balloonData.timestamp}.xlsx`)
    }

    function downloadHelper() {
        if (helperData === null) {
            console.error('별풍선 데이터가 없습니다.')
            return
        }

        const excel = toExcel(helperData)

        console.log(excel)

        if (!excel) {
            console.error('별풍선 데이터 변환에 실패했습니다.')
            return
        }

        downloadExcel(excel, `${broadcastId}-helper-${helperData.timestamp}.xlsx`)
    }

    function downloadMixed() {
        if (balloonData === null || helperData === null) {
            console.error('데이터가 없습니다.')
            return
        }

        const mixed = mixData(balloonData, helperData)

        if (!mixed) {
            console.error('데이터 병합에 실패했습니다.')
            return
        }

        const excel = toExcel(mixed)

        if (!excel) {
            console.error('별풍선 데이터 변환에 실패했습니다.')
            return
        }

        downloadExcel(excel, `${broadcastId}-mixed-${helperData.timestamp}.xlsx`)
    }
</script>

<dialog class="modal" id="app_modal">
    <div class="modal-box">
        <div class="flex flex-col gap-4">
            {#if isBalloon}
                <h3 class="font-bold text-lg">방송국 ID 입력</h3>
                <input type="text" placeholder="방송국 ID" class="input input-bordered w-full max-w-xs"
                       bind:value={broadcastId}>
            {/if}
            <button class="btn btn-primary" on:click={onStart}>가져오기 시작</button>
            <div class="collapse bg-base-200">
                <input type="checkbox"/>
                <div class="collapse-title text-xl font-medium">
                    데이터 다운로드
                </div>
                <div class="collapse-content">
                    <div class="flex flex-col gap-4">
                        <div class="flex gap-4">
                            <div class="flex flex-col w-1/2">
                                <h3 class="font-medium text-sm">별풍선 데이터 다운로드</h3>
                                <button class="btn btn-primary" disabled={balloonData === null}
                                        on:click={downloadBalloon}>
                                    {balloonData === null ? '데이터 없음' : balloonData.timestamp}
                                </button>
                            </div>
                            <div class="flex flex-col w-1/2">
                                <h3 class="font-medium text-sm">아프리카 도우미 데이터 다운로드</h3>
                                <button class="btn btn-primary" disabled={helperData === null}
                                        on:click={downloadHelper}>
                                    {helperData === null ? '데이터 없음' : helperData.timestamp}
                                </button>
                            </div>
                        </div>

                        <button class="btn btn-primary" disabled={balloonData === null || helperData === null}
                                on:click={downloadMixed}>
                            {balloonData === null || helperData === null ? '데이터 없음' : '데이터 병합 다운로드'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form class="modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>
