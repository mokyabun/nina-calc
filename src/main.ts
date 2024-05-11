import './app.css'
import { GM } from '$'
import { IS_POSTPONE, LAST_SAVE_TIME } from './lib/constants'
import Modal from './lib/components/Modal.svelte'
import { getStreamStartTime } from './lib/stream-info'
import { Utils } from './lib/utils'
import { connectionPoll, onCmd } from './lib/socket'
import { addBalloon } from './lib/balloon'
import { testData } from './lib/testdata'

const main = async () => {
    // @ts-ignore
    let broadcasterId = loginInfo.afreeca.pid

    if (!broadcasterId) {
        alert('로그인 상태가 아닙니다.')
        return
    }

    const startTime = await getStreamStartTime(broadcasterId)

    if (!startTime) {
        alert('방송 시작 시간을 가져오는데 오류가 발생했습니다.')
        return
    }

    const lastSaveTime = await Utils.getTimeValue(LAST_SAVE_TIME, startTime)

    if (!lastSaveTime) {
        alert('방송 시작 시간을 가져오는데 오류가 발생했습니다.')
        return
    }

    // Delete old balloons
    if (lastSaveTime.isBefore(startTime)) {
        const isPostpone = await GM.getValue(IS_POSTPONE, false)

        if (!isPostpone) {
            console.log('Deleting old balloons')
            await Utils.deleteAllBalloons()
        }

        await GM.setValue(IS_POSTPONE, false)
    }

    await GM.setValue(LAST_SAVE_TIME, startTime.toISOString())

    // Add app to the body
    const app = new Modal({
        target: (() => {
            const app = document.createElement('div')
            document.body.append(app)
            return app
        })(),
    })

    // Is F10 is pressed, open the modal
    document.addEventListener('keydown', (e) => {
        if (e.key == 'F10') {
            //@ts-ignore
            app_modal.showModal()
        }
    })

    connectionPoll()
}

await main()
