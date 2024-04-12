import * as Excel from 'exceljs';
import {GM_download} from "$";
import {balloonToExcel, toExcel} from "./converter.service";
import {mixData} from "./mixer.service";
import type {BalloonData, HelperData, MixedData, sortType} from "../types";
import {userSorter} from "./sort.service";

export async function downloadExcel(workbook: Excel.Workbook, filename: string) {
    const fileData = await workbook.xlsx.writeBuffer()
    const blob = new Blob([fileData], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    const url = URL.createObjectURL(blob)
    GM_download({
        url,
        name: filename,
        onload: () => {
            console.log('다운로드 완료')
        },
        onerror: (e) => {
            console.error('다운로드 실패', e)

            if (e.error === 'not_whitelisted') {
                alert('xlsx 파일 다운로드가 차단되었습니다. 설정에서 허용해주세요.')
            }
        }
    })
}

export function formatTimestamp(timestamp: string) {
    return timestamp.replace(/^(\d{4})\. (\d{1,2})\. (\d{1,2})\.$/, '$1-$2-$3');
}

export async function downloadBalloon(balloonData: BalloonData | null, sort: sortType) {
    if (!balloonData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    balloonData.userData = userSorter(balloonData.userData, sort)

    const excel = balloonToExcel(balloonData)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `ninacalc-balloon-${formatTimestamp(balloonData.timestamp)}.xlsx`)
}

export async function downloadHelper(helperData: HelperData | null, sort: sortType) {
    if (!helperData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    helperData.userData = userSorter(helperData.userData, sort)

    const excel = toExcel(helperData)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `ninacalc-helper-${formatTimestamp(helperData.timestamp)}.xlsx`)
}

export async function downloadMixed(balloonData: BalloonData | null, helperData: HelperData | null, sort: sortType) {
    if (!balloonData || !helperData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    const mixed = mixData(balloonData, helperData)

    if (!mixed) {
        console.error('데이터 병합에 실패했습니다.')
        return
    }

    mixed.userData = userSorter(mixed.userData, sort)

    const excel = toExcel(mixed)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `ninacalc-mixed-${formatTimestamp(balloonData.timestamp)}.xlsx`)
}
