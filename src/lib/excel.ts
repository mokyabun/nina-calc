import * as Excel from 'exceljs'
import type { BalloonDataSum, Sub } from '../types'

export function toExcel(balloonData: BalloonDataSum[], subData: Sub[]) {
    // Create a workbook
    const workbook = new Excel.Workbook()
    workbook.creator = '니나 계산기'
    workbook.lastModifiedBy = '니나 계산기'
    workbook.created = new Date()
    workbook.modified = new Date()

    // Add balloon data
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
    for (const data of balloonData) {
        const row = [data.uid, data.nicknames.join(', '), data.amountSum]

        // Add first message
        if (data.message.length > 0) {
            row.push(data.message[0])
        }

        sheet.addRow(row)

        // Add other messages
        for (let i = 1; i < data.message.length; i++) {
            sheet.addRow(['', '', '', data.message[i]])
        }
    }

    // Add sub data
    const subSheet = workbook.addWorksheet('구독')

    const subHeaders = ['ID', '닉네임', '구독 개월']
    const subHeaderRow = subSheet.addRow(subHeaders)
    subHeaderRow.font = { bold: true }
    subHeaderRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '8DB4E2' },
    }

    for (const sub of subData) {
        const row = [sub.uid, sub.nickname, sub.month]

        subSheet.addRow(row)
    }

    return workbook
}
