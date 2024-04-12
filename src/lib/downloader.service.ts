import * as Excel from 'exceljs';
import {GM_download} from "$";
import {balloonToExcel, toExcel} from "./converter.service";
import {mixData} from "./mixer.service";

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
                alert('xlsx 파일 다운로드가 차단되었습니다. 설정에서 허용해주세요. @sucat00 트위터에서 사용법을 확인해주세요!')
            }
        }
    })
}

export async function downloadBalloon(broadcastId: string, balloonData: BalloonData | null) {
    if (!balloonData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    const excel = balloonToExcel(balloonData)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `${broadcastId}-balloon-${balloonData.timestamp}.xlsx`)
}

export async function downloadHelper(broadcastId: string, helperData: HelperData | null) {
    if (!helperData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    const excel = toExcel(helperData)

    console.log(excel)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `${broadcastId}-helper-${helperData.timestamp}.xlsx`)
}

export async function downloadMixed(broadcastId: string, balloonData: BalloonData | null, helperData: HelperData | null) {
    if (!balloonData || !helperData) {
        console.error('별풍선 데이터가 없습니다.')
        return
    }

    const mixed = mixData(balloonData, helperData)

    if (!mixed) {
        console.error('데이터 병합에 실패했습니다.')
        return
    }

    const excel = toExcel(mixed)

    if (!excel) {
        console.error('별풍선 데이터 변환에 실패했습니다.')
        return
    }

    return downloadExcel(excel, `${broadcastId}-mixed-${helperData.timestamp}.xlsx`)
}
