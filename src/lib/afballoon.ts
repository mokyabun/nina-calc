import {GM_deleteValue, GM_getValue, GM_setValue} from "$";
import {
    AF_BALLOON_DATA,
    AF_TEMP_CURRENT_PAGE,
    AF_TEMP_RAW_DATA, AUTO_OPEN,
    TEMP_START_TIME,
} from "./constants";
import {AF_WORKING} from "./constants";
import type {BalloonData, BalloonSingleData, BalloonSaveData} from "../types";
import dayjs from "dayjs";

export function getAfBalloon() {
    // Get start time
    const streamStartTimeString = GM_getValue(TEMP_START_TIME, '')

    if (streamStartTimeString === '') {
        console.error('startTime이 없음')
        alert('에러 발생: startTime이 없음')
        return
    }

    const streamStartTime = dayjs(streamStartTimeString)

    // Set AF_WORKING to true
    GM_setValue(AF_WORKING, true)

    // Get current page
    const currentPage = GM_getValue(AF_TEMP_CURRENT_PAGE, 1)

    // Start scraping
    const cols = document.querySelectorAll('body > div.sub_whole > div.sub_contents > div > div.myballoon > div:nth-child(2) > table > tbody > tr')

    const lastPage = cols.length !== 11

    const balloonRawData: BalloonSingleData[] = GM_getValue(AF_TEMP_RAW_DATA, [])

    for (let i = 1; i < cols.length; i++) { // Iterate through each row starting from 2nd row
        const col = cols[i]

        // Get time
        const timeText = col.querySelector('td:nth-child(1)')?.textContent

        if (!timeText) {
            console.error('No time element found')
            alert('아프리카 별풍선 정보를 가져오는 도중 오류가 발생했습니다.')
            continue
        }

        const time = dayjs(timeText)

        // If time is after stream start time
        if (time.isAfter(streamStartTime) || (lastPage && i === cols.length)) {
            // Get id and nickname
            const idAndNickname = col.querySelector('td:nth-child(2) > span')?.textContent

            if (!(idAndNickname)) {
                continue
            }

            const idAndNicknameArr = idAndNickname.split('(')

            const nickname = idAndNicknameArr[0]
            const id = idAndNicknameArr[1].replace(')', '')

            // Get balloon amount
            const amount = col.querySelector('td:nth-child(3)')?.textContent?.replace('개', '')

            const newBalloonData: BalloonSingleData = {
                uid: id,
                nickname: nickname,
                balloonAmount: Number(amount),
            }

            balloonRawData.push(newBalloonData)
        } else {
            // If scraping is done
            const balloonMapData = new Map<string, BalloonData>()

            for (const data of balloonRawData) {
                // Add user if not exists
                if (!balloonMapData.has(data.uid)) {
                    balloonMapData.set(data.uid, {
                        uid: data.uid,
                        nicknames: [],
                        balloonAmountSum: 0,
                        balloonCount: 0,
                    })
                }

                const balloonData = balloonMapData.get(data.uid)

                // Add nickname if not exists
                if (!(balloonData!.nicknames.includes(data.nickname))) {
                    balloonData!.nicknames.push(data.nickname)
                }

                // Add balloon amount
                balloonData!.balloonAmountSum += data.balloonAmount

                // Update balloon count
                balloonData!.balloonCount++
            }

            const afBalloonData: BalloonSaveData = {
                timestamp: streamStartTimeString,
                balloonData: Array.from(balloonMapData.values())
            }

            // Save data
            GM_setValue(AF_BALLOON_DATA, afBalloonData)

            // Reset temp data
            GM_deleteValue(AF_WORKING)
            GM_deleteValue(TEMP_START_TIME)
            GM_deleteValue(AF_TEMP_RAW_DATA)
            GM_deleteValue(AF_TEMP_CURRENT_PAGE)

            GM_setValue(AUTO_OPEN, true)

            return
        }
    }

    // Update raw data
    GM_setValue(AF_TEMP_RAW_DATA, balloonRawData)

    // Update current page
    GM_setValue(AF_TEMP_CURRENT_PAGE, currentPage + 1)

    // @ts-ignore
    goBJPage(currentPage + 1)
}