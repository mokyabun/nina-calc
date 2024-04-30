<script lang="ts">
    import type {BalloonSaveData, sortType} from "../../types";
    import {downloadData} from "../download.js";
    import {mixData} from "../mix";

    export let afData: BalloonSaveData | null
    export let afhpData: BalloonSaveData | null

    let sortOrder: sortType = 'asc'

    function downloadClick(data: BalloonSaveData | null) {
        if (data === null) {
            alert('데이터가 없습니다.')
            return
        }

        downloadData(data, sortOrder)
    }

    function downloadMixedClick() {
        if (afData === null || afhpData === null) {
            alert('데이터가 없습니다.')
            return
        }

        if (afData.timestamp !== afhpData.timestamp) {
            alert('두 데이터의 방송 시작 시간이 다릅니다.')
            return
        }

        downloadData(mixData(afData, afhpData), sortOrder)
    }
</script>

<div class="daisy-collapse bg-base-200">
    <input type="checkbox"/>
    <div class="daisy-collapse-title text-xl font-medium">
        데이터 다운로드
    </div>
    <div class="daisy-collapse-content">
        <div class="flex flex-col gap-4">
            <select class="daisy-select w-full text-base-content" bind:value={sortOrder}>
                <option disabled selected>정렬 순서</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
                <option value="latest">최신</option>
                <option value="oldest">오래된순</option>
                <option value="random">랜덤</option>
            </select>
            <div class="flex gap-4">
                <div class="flex flex-col w-1/2">
                    <h3 class="font-medium text-sm">별풍선 데이터 다운로드</h3>
                    <button class="daisy-btn daisy-btn-primary" disabled={afData === null}
                            on:click={() => downloadClick(afData)}>
                        {afData === null ? '데이터 없음' : afData.timestamp}
                    </button>
                </div>
                <div class="flex flex-col w-1/2">
                    <h3 class="font-medium text-sm">아프리카 도우미 데이터 다운로드</h3>
                    <button class="daisy-btn daisy-btn-primary" disabled={afhpData === null}
                            on:click={() => downloadClick(afhpData)}>
                        {afhpData === null ? '데이터 없음' : afhpData.timestamp}
                    </button>
                </div>
            </div>

            <button class="daisy-btn daisy-btn-primary" disabled={afData === null || afhpData === null}
                    on:click={downloadMixedClick}>
                {afData === null || afhpData === null ? '데이터 없음' : '데이터 병합 다운로드'}
            </button>
        </div>
    </div>
</div>