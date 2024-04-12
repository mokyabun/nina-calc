import {createWorkbook} from "./excel.utils";

export function balloonToExcel(data: BalloonData) {
    const workbook = createWorkbook()

    const sheet = workbook.addWorksheet('별풍선')

    const headers = ['ID', '닉네임', '별풍선 수']

    const headerRow = sheet.addRow(headers)
    headerRow.font = {bold: true}

    for (const [id, nicknames] of Object.entries(data.userData)) {
        const balloon = data.countData[id]

        const rowData = [id, nicknames.join(', '), balloon]
        sheet.addRow(rowData)
    }

    return workbook
}

export function toExcel(data: MixedData | HelperData) {
    const workbook = createWorkbook()

    const sheet = workbook.addWorksheet('별풍선')

    const headers = ['ID', '닉네임', '별풍선 수', '메시지']

    const headerRow = sheet.addRow(headers)
    headerRow.font = {bold: true}

    for (const [id, nicknames] of Object.entries(data.userData)) {
        const balloon = data.countData[id]
        const msgData = data.msgData[id]

        const rowData = [id, nicknames.join(', '), balloon, msgData[0] ?? '']
        sheet.addRow(rowData)

        for (let i = 1; i < msgData.length; i++) {
            const rowData = ['', '', '', msgData[i]]
            sheet.addRow(rowData)
        }
    }

    return workbook
}
