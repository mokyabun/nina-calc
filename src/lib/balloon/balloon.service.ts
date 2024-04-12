import {GM_deleteValue, GM_getValue, GM_setValue} from "$";
import {
    BALLOON_DATA,
    BALLOON_HAS_DATA,
    TEMP_COUNT,
    TEMP_CURRENT_PAGE,
    TEMP_GETTING_DATA,
    TEMP_IDS,
    TEMP_NICKNAME,
    TEMP_START_TIME
} from "./balloon.constants";
import type {BalloonCountData, BalloonData, User} from "../../types";

function makeUserData() {
    let userData: User = {}

    for (const id of GM_getValue(TEMP_IDS, [])) {
        const nicknames = GM_getValue(TEMP_NICKNAME + id, [])

        userData[id] = nicknames
    }

    return userData
}

function makeCountData() {
    let balloonCountData: BalloonCountData = {}

    for (const id of GM_getValue(TEMP_IDS, [])) {
        const balloon = GM_getValue(TEMP_COUNT + id, 0)

        balloonCountData[id] = balloon
    }

    return balloonCountData
}

function clean() {
    for (const id of GM_getValue(TEMP_IDS, [])) {
        GM_deleteValue(TEMP_COUNT + id)
        GM_deleteValue(TEMP_NICKNAME + id)
    }
    GM_deleteValue(TEMP_IDS)
    GM_deleteValue(TEMP_CURRENT_PAGE)
    GM_deleteValue(TEMP_START_TIME)
    GM_deleteValue(TEMP_GETTING_DATA)
}

export function balloonService() {
    const startTimeString = GM_getValue(TEMP_START_TIME, '')

    if (startTimeString === '') {
        console.error('startTime이 없음')
        return
    }

    const startTime = new Date(startTimeString)

    GM_setValue(TEMP_GETTING_DATA, true)

    const cols = document.querySelectorAll('body > div.sub_whole > div.sub_contents > div > div.myballoon > div:nth-child(2) > table > tbody > tr')

    for (let i = 1; i < cols.length; i++) {
        const col = cols[i]

        const timeElement = col.querySelector('td:nth-child(1)')

        if (!timeElement?.textContent) {
            console.log('시간이 없음')
            return
        }

        const time = new Date(timeElement.textContent)

        if (time < startTime) {
            const countData = makeCountData()
            const userData = makeUserData()

            GM_setValue(BALLOON_DATA, {
                timestamp: (new Date()).toLocaleDateString(),
                countData,
                userData
            } as BalloonData)

            GM_setValue(BALLOON_HAS_DATA, true)

            clean()

            //@ts-ignore
            app_modal.showModal()
            return
        }

        const idAndNicknameElement = col.querySelector('td:nth-child(2) > span')

        if (!idAndNicknameElement?.textContent) {
            continue
        }

        const idAndNickname = idAndNicknameElement.textContent.split('(')

        const nickname = idAndNickname[0]
        const id = idAndNickname[1].replace(')', '')
        const balloon = col.querySelector('td:nth-child(3)')?.textContent?.replace('개', '')

        GM_setValue(TEMP_COUNT + id, GM_getValue(TEMP_COUNT + id, 0) + Number(balloon))
        GM_setValue(TEMP_NICKNAME + id, Array.from(new Set(GM_getValue(TEMP_NICKNAME + id, [] as Array<string>).concat(nickname))))
        GM_setValue(TEMP_IDS, Array.from(new Set(GM_getValue(TEMP_IDS, [] as Array<string>).concat(id))))
    }

    GM_setValue(TEMP_CURRENT_PAGE, GM_getValue(TEMP_CURRENT_PAGE, 1) + 1)

    // @ts-ignore
    goBJPage(GM_getValue(TEMP_CURRENT_PAGE))
}