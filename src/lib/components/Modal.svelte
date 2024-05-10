<script lang="ts">
    import type { BalloonDataSum } from '../../types'
    import { GM, GM_getValue } from '$'
    import { BALLOON, BALLOON_KEYS, IS_POSTPONE } from '../constants'
    import ViewData from './ViewData.svelte'
    import DownloadCollpase from './DownloadCollpase.svelte'

    const data: { [key: string]: BalloonDataSum } = {}

    // Load data
    const keys = GM_getValue<string[]>(BALLOON_KEYS, [])
    for (const key of keys) {
        const newData = GM_getValue<BalloonDataSum>(key)

        data[key] = newData
    }

    // Listen for data changes
    document.addEventListener('balloonDataChanged', ((event: CustomEvent<BalloonDataSum>) => {
        data[BALLOON + event.detail.uid] = event.detail
    }) as EventListener)

    const onPostpone = async () => {
        const ok = confirm('정말로 감사인사를 미루시겠습니까?')

        if (ok) {
            await GM.setValue(IS_POSTPONE, true)
        }
    }

    const openDataView = () => {
        //@ts-ignore
        data_modal.showModal()
    }
</script>

<dialog class="daisy-modal z-[999]" id="app_modal">
    <div class="daisy-modal-box">
        <div class="flex flex-col gap-4">
            <button class="daisy-btn daisy-btn-primary" on:click={openDataView}>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                별풍선 데이터 보기
            </button>
            <button class="daisy-btn daisy-btn-warning" on:click={onPostpone}>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                감사인사 미루기
            </button>
            <DownloadCollpase {data} />
        </div>
    </div>
    <form class="daisy-modal-backdrop" method="dialog">
        <button>close</button>
    </form>
</dialog>

<ViewData {data} />
