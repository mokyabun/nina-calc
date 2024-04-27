import * as Excel from "exceljs";
import type {BalloonSaveData} from "../types";

export function toExcel(data: BalloonSaveData) {
    // Create a workbook
    const workbook = new Excel.Workbook()
    workbook.creator = '니나 계산기'
    workbook.lastModifiedBy = '니나 계산기'
    workbook.created = new Date()
    workbook.modified = new Date()

    // Add a worksheets
    const sheet = workbook.addWorksheet('별풍선')

    // Add rows
    const headers = ['ID', '닉네임', '도네 개수', '별풍선 평균', '총 별풍선 수']

    const headerRow = sheet.addRow(headers)
    headerRow.font = {bold: true}

    // Enumerate data
    for (const balloonData of data.balloonData) {
        const row = [
            balloonData.uid,
            balloonData.nicknames.join(', '),
            balloonData.balloonCount,
            balloonData.balloonAverage,
            balloonData.balloonAmountSum,
        ]

        // If message is not undefined
        if (balloonData.messageData) {
            // Add message header if not exists
            if (headers.length === 3) headers.push('메시지')

            // Add message to the row
            row.push(balloonData.messageData[0])

            sheet.addRow(row)

            // Add messages to new rows
            for (let i = 1; i < balloonData.messageData.length; i++) {
                sheet.addRow(['', '', '', '', '', balloonData.messageData[i]])
            }
        } else {
            sheet.addRow(row)
        }
    }

    return workbook
}
