<script lang="ts">
    import type { BalloonDataSum, sortType, Sub } from '../../types'
    import { Utils } from '../utils.js'

    export let balloonData: { [key: string]: BalloonDataSum }
    export let subData: { [key: string]: Sub }

    let sortOrder: sortType = 'asc'
    let dataType: 'balloon' | 'sub' = 'balloon'

    $: sortedBalloonData = Utils.sortBalloonData(balloonData, sortOrder)
    $: sortedSubData = Utils.sortSubData(subData, sortOrder)
</script>

<dialog class="daisy-modal z-[1000]" id="data_modal">
    <div class="daisy-modal-box w-11/12 max-w-5xl">
        <div class="flex mb-4">
            <select bind:value={sortOrder} class="daisy-select w-full text-base-content">
                <option disabled selected>정렬 순서</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
            </select>
            <select bind:value={dataType} class="daisy-select w-full text-base-content">
                <option disabled selected>데이터 종류</option>
                <option value="balloon">별풍선</option>
                <option value="sub">구독</option>
            </select>
        </div>
        {#if dataType === 'balloon'}
            <table class="daisy-table overflow-x-auto">
                <thead>
                    <tr class="bg-base-200 font-bold">
                        <th>ID</th>
                        <th>닉네임</th>
                        <th>후원금액</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(sortedBalloonData) as value}
                        <tr>
                            <td>{value.uid}</td>
                            <td>{value.nicknames.join(', ')}</td>
                            <td>{value.amountSum}</td>
                            {#if value.message.length > 0}
                                <td>{value.message[0]}</td>
                            {/if}
                        </tr>
                        {#each value.message as message, index}
                            {#if index > 0}
                                <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td>{message}</td>
                                </tr>
                            {/if}
                        {/each}
                    {/each}
                </tbody>
            </table>
        {:else}
            <table class="daisy-table overflow-x-auto">
                <thead>
                    <tr class="bg-base-200 font-bold">
                        <th>ID</th>
                        <th>닉네임</th>
                        <th>구독 개월</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.values(sortedSubData) as value}
                        <tr>
                            <td>{value.uid}</td>
                            <td>{value.nickname}</td>
                            <td>{value.month} 개월</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
    <form class="daisy-modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>
