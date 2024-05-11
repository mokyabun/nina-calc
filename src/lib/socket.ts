import { addBalloon, addBalloonMsg } from './balloon'
import { cmdType } from '../types'
import { addSub } from './sub'

export function connectionPoll() {
    // Refresh to load existing balloons
    setTimeout(() => {
        const poll = setInterval(() => {
            // @ts-ignore
            const socket = page.data.socket

            if (!socket) {
                console.log('socket not found')
                return
            }

            socket.on('cmd', onCmd)

            // Get a href by selector
            const refreshButton = document.querySelector<HTMLAnchorElement>(
                '#page_save_btn > div > div > a.btns.btn_gray.btn_alertlist_refresh',
            )

            if (!refreshButton) {
                console.log('refresh button not found')
                return
            }

            refreshButton.click()

            clearInterval(poll)
        }, 500)
    }, 500)
}

export async function onCmd(data: any) {
    if (!(data.type === 'alertload')) {
        return
    }

    if (data.sub === 'chat') {
        await addBalloonMsg(data.msg, data.id)
    } else if (data.sub === 'add' || data.sub === 'load') {
        for (const item of data.data) {
            if (cmdType[item.type as keyof typeof cmdType] === 'star') {
                await addBalloon({
                    idx: item.idx,
                    uid: item.id,
                    nickname: item.name,
                    amount: item.value,
                    timestamp: item.time,
                    message: item.msg,
                })
            } else if (cmdType[item.type as keyof typeof cmdType] === 'afsubscription') {
                await addSub({
                    uid: item.id,
                    nickname: item.name,
                    month: item.value,
                    timestamp: item.time,
                })
            }
        }
    }
}
