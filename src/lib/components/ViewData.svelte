<script lang="ts">
    import type { BalloonDataSum, sortType } from '../../types'
    import { Utils } from '../utils.js'

    export let data: { [key: string]: BalloonDataSum }

    let sortOrder: sortType = 'asc'

    $: sortedData = Utils.sortData(data, sortOrder)
</script>

<dialog class="daisy-modal z-[1000]" id="data_modal">
    <div class="daisy-modal-box w-11/12 max-w-5xl">
        <select bind:value={sortOrder} class="daisy-select w-full text-base-content mb-4">
            <option disabled selected>정렬 순서</option>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
        </select>
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
                {#each Object.values(sortedData) as value}
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
    </div>
    <form class="daisy-modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>
