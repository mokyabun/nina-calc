import type {BalloonData, BalloonSaveData, BalloonSingleData} from "../types";
import {GM_openInTab, GM_setValue} from "$";
import {HELPER_DATA} from "./constants";
import {AUTO_OPEN} from "./constants";
import GM_fetch from "@trim21/gm-fetch";

export function getAfHpBalloon(streamStartTime: string) {
    const cols = document.querySelectorAll('#alertlist_table > tbody > tr')

    const balloonRawData: BalloonSingleData[] = []

    // Get balloon data
    for (const col of cols) {
        const type = col.querySelector('td.type > p > b')?.textContent

        if (!type || !type.startsWith('별풍선')) {
            console.log('별풍선 메시지가 아님')
            alert('별풍선 메시지가 아닌 항목이 발견 되었습니다.')
            continue
        }

        const nickname = col.querySelector('td.name > p')?.textContent?.split('(')[0]
        const id = col.querySelector('td.name > p > span')?.textContent?.slice(1, -1)
        // 1 개 -> 1
        const balloon = col.querySelector('td.value > p')?.textContent?.replace(' 개', '').replace(',', '')

        if (!nickname || !id || !balloon || isNaN(Number(balloon))) {
            console.error('올바른 정보가 아님')
            alert('아프리카 도우미 정보를 가져오는 도중 오류가 발생했습니다.')
            continue
        }

        const msg = col.querySelector('td.msg > p')?.textContent

        const newBalloonData: BalloonSingleData = {
            uid: id,
            nickname: nickname,
            balloonAmount: Number(balloon),
            message: msg === null ? undefined : msg,
        }

        balloonRawData.push(newBalloonData)
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
        balloonData: Array.from(balloonMapData.values())
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