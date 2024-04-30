import type {BalloonData, BalloonSaveData, BalloonSingleData, SubSingleData} from "../types";
import {GM_openInTab, GM_setValue} from "$";
import {HELPER_DATA} from "./constants";
import {AUTO_OPEN} from "./constants";
import GM_fetch from "@trim21/gm-fetch";

function getAfHpBalloon(col: Element) {
    const nickname = col.querySelector('td.name > p')?.textContent?.split('(')[0]
    const id = col.querySelector('td.name > p > span')?.textContent?.slice(1, -1)
    const balloon = col.querySelector('td.value > p')?.textContent?.replace(' 개', '').replace(',', '')

    if (!nickname) {
        alert('닉네임 가져오기 오류')
        return
    }

    if (!id) {
        alert('아이디 가져오기 오류')
        return
    }

    if (!balloon) {
        alert('별풍선 개수 가져오기 오류')
        return
    }

    if (isNaN(Number(balloon))) {
        alert('별풍선 개수가 숫자가 아닌 값이 있습니다.')
        return
    }

    const msg = col.querySelector('td.msg > p')?.textContent

    const newBalloonData: BalloonSingleData = {
        uid: id,
        nickname: nickname,
        balloonAmount: Number(balloon),
        message: msg === null ? undefined : msg,
    }

    return newBalloonData
}

function getAfHpSub(col: Element) {
    const nickname = col.querySelector('td.name > p')?.textContent?.split('(')[0]
    const id = col.querySelector('td.name > p > span')?.textContent?.slice(1, -1)
    const month = col.querySelector('td.value > p')?.textContent?.replace(' 개월', '')

    if (!nickname) {
        alert('닉네임 가져오기 오류')
        return
    }

    if (!id) {
        alert('아이디 가져오기 오류')
        return
    }

    if (!month) {
        alert('별풍선 개수 가져오기 오류')
        return
    }

    const newSubData: SubSingleData = {
        uid: id,
        nickname: nickname,
        month: Number(month),
    }

    return newSubData
}

export function getAfHp(streamStartTime: string) {
    const cols = document.querySelectorAll('#alertlist_table > tbody > tr')

    const balloonRawData: BalloonSingleData[] = []
    const subRawData: SubSingleData[] = []

    // Get balloon data
    for (const col of cols) {
        const type = col.querySelector('td.type > p > b')?.textContent

        if (!type) {
            alert('타입 가져오기 오류')
            continue
        }

        if (type.startsWith('별풍선')) {
            const data = getAfHpBalloon(col)
            if (data === undefined) {
                continue
            }
            balloonRawData.push(data)
            continue
        }

        if (type.startsWith('구독')) {
            const data = getAfHpSub(col)
            if (data === undefined) {
                continue
            }
            subRawData.push(data)
            continue
        }
    }

    // Process balloon data
    const balloonMapData = new Map<string, BalloonData>()

    for (const data of balloonRawData) {
        // Add user if not exists
        if (!balloonMapData.has(data.uid)) {
            balloonMapData.set(data.uid, {
                uid: data.uid,
                nicknames: [],
                balloonAmountSum: 0,
                balloonCount: 0,
                messageData: [],
            })
        }

        const balloonData = balloonMapData.get(data.uid)

        // Add nickname if not exists
        if (!(balloonData!.nicknames.includes(data.nickname))) {
            balloonData!.nicknames.push(data.nickname)
        }

        // Add balloon amount
        balloonData!.balloonAmountSum += data.balloonAmount

        // Add message if exists
        if (data.message) {
            balloonData!.messageData!.push(data.message)
        }

        // Update balloon count
        balloonData!.balloonCount++
    }

    const afHpData: BalloonSaveData = {
        timestamp: streamStartTime,
        balloonData: Array.from(balloonMapData.values()),
        subData: subRawData
    }

    // Save data
    GM_setValue(HELPER_DATA, afHpData)

    // Check if there are more than 200 balloon messages
    if (cols.length >= 200) {
        const okay = confirm('200개 이상의 별풍선 메시지가 존재합니다. 별풍선 정보 웹사이트를 사용하여 나머지 정보를 가져오시겠습니까?')

        if (okay) {
            // Open afballoon website with modal open
            GM_setValue(AUTO_OPEN, true)
            GM_openInTab('https://point.afreecatv.com/Balloon/AfreecaNormalExchange.asp', {active: true})
        }
    }
}