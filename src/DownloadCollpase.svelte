<script lang="ts">
    import {downloadBalloon, downloadHelper, downloadMixed} from "./lib/download.js";
    import type {BalloonData, HelperData, sortType} from "./types";

    export let balloonData: BalloonData | null
    export let helperData: HelperData | null

    let sortOrder: sortType = 'asc'
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
                    <button class="daisy-btn daisy-btn-primary" disabled={balloonData === null}
                            on:click={() => downloadBalloon(balloonData, sortOrder)}>
                        {balloonData === null ? '데이터 없음' : balloonData.timestamp}
                    </button>
                </div>
                <div class="flex flex-col w-1/2">
                    <h3 class="font-medium text-sm">아프리카 도우미 데이터 다운로드</h3>
                    <button class="daisy-btn daisy-btn-primary" disabled={helperData === null}
                            on:click={() => downloadHelper(helperData, sortOrder)}>
                        {helperData === null ? '데이터 없음' : helperData.timestamp}
                    </button>
                </div>
            </div>

            <button class="daisy-btn daisy-btn-primary" disabled={balloonData === null || helperData === null}
                    on:click={() => downloadMixed(balloonData, helperData, sortOrder)}>
                {balloonData === null || helperData === null ? '데이터 없음' : '데이터 병합 다운로드'}
            </button>
        </div>
    </div>
</div>