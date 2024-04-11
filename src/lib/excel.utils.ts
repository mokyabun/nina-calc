import * as Excel from "exceljs";

export function createWorkbook() {
    const workbook = new Excel.Workbook()

    workbook.creator = '니나 계산기'
    workbook.lastModifiedBy = '니나 계산기'
    workbook.created = new Date()
    workbook.modified = new Date()

    return workbook
}
