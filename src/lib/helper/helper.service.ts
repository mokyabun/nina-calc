import {GM_openInTab, GM_setValue} from "$";
import {HELPER_DATA, HELPER_HAS_DATA} from "./helper.constants";
import type {BalloonCountData, HelperData, User, UserBalloonMsgData} from "../../types";

export function helperService() {
    const cols = document.querySelectorAll('#alertlist_table > tbody > tr')

    const userResult: User = {}
    const countResult: BalloonCountData = {}
    const msgResult: UserBalloonMsgData = {}

    for (const col of cols) {
        const type = col.querySelector('td.type > p > b')?.textContent

        if (!type || !type.startsWith('별풍선')) {
            console.log('별풍선 메시지가 아님')
            continue
        }

        const nickname = col.querySelector('td.name > p')?.textContent?.split('(')[0]
        const id = col.querySelector('td.name > p > span')?.textContent?.slice(1, -1)
        const balloon = col.querySelector('td.value > p')?.textContent?.split(' ')[0]

        if (!nickname || !id) {
            continue
        }

        const msg = col.querySelector('td.msg > p')?.textContent

        if (!msg) {
            continue
        }

        if (userResult[id] !== undefined) {
            userResult[id] = Array.from(new Set(userResult[id].concat(nickname)))
        } else {
            userResult[id] = [nickname]
        }

        if (countResult[id] !== undefined) {
            countResult[id] += Number(balloon)
        } else {
            countResult[id] = Number(balloon)
        }

        if (msgResult[id] !== undefined) {
            msgResult[id].push(msg)
        } else {
            msgResult[id] = [msg]
        }
    }

    GM_setValue(HELPER_DATA, {
        timestamp: (new Date()).toLocaleDateString(),
        countData: countResult,
        userData: userResult,
        msgData: msgResult,
    } as HelperData)

    GM_setValue(HELPER_HAS_DATA, true)

    if (cols.length === 200) {
        const okay = confirm('200개 이상의 별풍선 메시지가 존재합니다. 별풍선 정보 웹사이트를 사용하여 나머지 정보를 가져오시겠습니까?')

        if (okay) {
            GM_openInTab('https://point.afreecatv.com/Balloon/AfreecaNormalExchange.asp', {active: true})
        }
    }
}