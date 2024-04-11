import * as Excel from 'exceljs';
import {GM_download} from "$";

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