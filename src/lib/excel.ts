import * as Excel from 'exceljs'
import type { BalloonDataSum } from '../types'

export function toExcel(data: BalloonDataSum[]) {
    // Create a workbook
    const workbook = new Excel.Workbook()
    workbook.creator = '니나 계산기'
    workbook.lastModifiedBy = '니나 계산기'
    workbook.created = new Date()
    workbook.modified = new Date()

    // Add a worksheets
    const sheet = workbook.addWorksheet('별풍선')

    // Add rows
    const headers = ['ID', '닉네임', '후원금액', '내용']
    const headerRow = sheet.addRow(headers)
    headerRow.font = { bold: true }
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '8DB4E2' },
    }

    // Enumerate data
    for (const balloonData of Object.values(data)) {
        const row = [balloonData.uid, balloonData.nicknames.join(', '), balloonData.amountSum]

        // Add first message
        if (balloonData.message.length > 0) {
            row.push(balloonData.message[0])
        }

        const addedRow = sheet.addRow(row)
        addedRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C5D9F1' },
        }

        // Add other messages
        for (let i = 1; i < balloonData.message.length; i++) {
            sheet.addRow(['', '', '', balloonData.message[i]])
        }
    }

    return workbook
}
