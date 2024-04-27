import * as Excel from 'exceljs';
import {GM_download} from "$";
import JSZip from "jszip";
import type {BalloonSaveData, sortType} from "../types";
import {toExcel} from "./excel";
import {sortData} from "./sortData";

async function downloadExcel(workbook: Excel.Workbook, filename: string) {
    const fileData = await workbook.xlsx.writeBuffer()
    const blob = new Blob([fileData], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    const url = URL.createObjectURL(blob)

    const downloadAsZip = async () => {
        const zip = new JSZip()
        zip.file(filename, blob)
        const zipFile = await zip.generateAsync({type: 'blob'})

        const zipUrl = URL.createObjectURL(zipFile)

        GM_download({
            url: zipUrl,
            name: filename,
            onload: () => {
                console.log('Zip 다운로드 완료')
            },
            onerror: (e) => {
                console.error('Zip 다운로드 실패', e)
            }
        })
    }

    // Download the file
    GM_download({
        url,
        name: filename,
        onload: () => {
            console.log('다운로드 완료')
        },
        onerror: async (e) => {
            console.error('다운로드 실패', e)

            // If the error is 'not_whitelisted', download the file as a zip
            if (e.error === 'not_whitelisted') {
                alert('xlsx 파일 다운로드가 차단되었습니다. zip파일로 압축하여 다운로드 받습니다.')
                downloadAsZip()
            }
        }
    })
}

export async function downloadData(data: BalloonSaveData, sort: sortType) {
    sortData(data, sort)

    const excel = toExcel(data)

    return downloadExcel(excel, `ninacalc ${data.timestamp}`)
}
