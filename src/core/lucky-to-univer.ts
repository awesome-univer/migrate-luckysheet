import { ISheetDataValidationRule, IWorkbookData, IWorksheetData } from '@univerjs/core';
import { ILuckyJson } from '../common/interface/lucky-json';
import { workbookProperty } from './workbook-property';
import { worksheetProperty } from './worksheet-property';
import { worksheetConfig } from './worksheet-config';
import { cellData } from './cell';
import { DATA_VALIDATION_PLUGIN_NAME } from '@univerjs/sheets-data-validation';
import { IConditionFormattingRule, SHEET_CONDITIONAL_FORMATTING_PLUGIN } from '@univerjs/sheets-conditional-formatting';


export function luckyToUniver(luckyJson: Partial<ILuckyJson>) {
    const workbookData: Partial<IWorkbookData> = {};
    workbookData.styles = {};

    workbookProperty(workbookData, luckyJson);

    const sheets = luckyJson.data;
    const dataValidationData: Record<string, ISheetDataValidationRule[]>  = {};
    const conditionFormat: Record<string, IConditionFormattingRule[]> = {};

    if (Array.isArray(sheets)) {
        workbookData.sheets = {};
        for (let sheet of sheets) {
            const worksheetData: Partial<IWorksheetData> = {};

            const { worksheetDataVerification, worksheetConditionFormat } = worksheetProperty(workbookData, worksheetData, luckyJson, sheet);

            if (worksheetDataVerification && worksheetDataVerification.length > 0) {
                dataValidationData[worksheetData.id!] = worksheetDataVerification;
            }

            if (worksheetConditionFormat && worksheetConditionFormat.length > 0) {
                conditionFormat[worksheetData.id!] = worksheetConditionFormat;
            }

            worksheetConfig(workbookData, worksheetData, luckyJson, sheet);
            cellData(workbookData, worksheetData, luckyJson, sheet);

            workbookData.sheets[worksheetData.id!] = worksheetData;
        }
    }
    
    workbookData.resources = [
        {
            name: DATA_VALIDATION_PLUGIN_NAME,
            data: JSON.stringify(dataValidationData)
        },
        {
            name: SHEET_CONDITIONAL_FORMATTING_PLUGIN,
            data: JSON.stringify(conditionFormat)
        }
    ]

    return workbookData
}
