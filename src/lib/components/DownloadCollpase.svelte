<script lang="ts">
    import type { BalloonDataSum, sortType, Sub } from '../../types'
    import { Utils } from '../utils'
    import { toExcel } from '../excel'
    import { downloadExcel } from '../download.js'
    import { GM_getValue } from '$'
    import { LAST_SAVE_TIME } from '../constants'
    import dayjs from 'dayjs'

    export let balloonData: { [key: string]: BalloonDataSum }
    export let subData: { [key: string]: Sub }

    let sortOrder: sortType = 'asc'

    const startTime = GM_getValue<string>(LAST_SAVE_TIME)

    const onDownload = () => {
        const sortedBalloonData = Utils.sortBalloonData(balloonData, sortOrder)
        const sortedSubData = Utils.sortSubData(subData, sortOrder)

        const excelData = toExcel(sortedBalloonData, sortedSubData)

        downloadExcel(excelData, dayjs(startTime).format('YYYY-MM-DD'))
    }
</script>

<div class="daisy-collapse bg-base-200">
    <input type="checkbox" />
    <div class="daisy-collapse-title text-xl font-medium">데이터 다운로드</div>
    <div class="daisy-collapse-content">
        <div class="flex flex-col gap-4">
            <select bind:value={sortOrder} class="daisy-select w-full text-base-content">
                <option disabled selected>정렬 순서</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
            </select>
            <button class="daisy-btn daisy-btn-primary" on:click={onDownload}>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                데이터 다운로드
            </button>
        </div>
    </div>
</div>
