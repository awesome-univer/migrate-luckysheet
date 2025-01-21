import { generateRandomId, IWorkbookData, IWorksheetData } from "@univerjs/core";
import { ILuckyJson } from "../common/interface/lucky-json";
import { ILuckySheet } from "../common/interface/lucky-sheet";
import { CFNumberOperator, CFRuleType, CFSubRuleType, IConditionFormattingRule, INumberHighlightCell } from "@univerjs/sheets-conditional-formatting";
import { IluckysheetCFDefaultFormat, IluckysheetConditionFormat } from "../common/interface/condition-format";
import { rangeArrayToRanges } from "../common/util/selection";

export function conditionFormat(workbookData: Partial<IWorkbookData>, worksheetData: Partial<IWorksheetData>, luckyJson: Partial<ILuckyJson>, sheet: Partial<ILuckySheet>) {
    if(sheet.luckysheet_conditionformat_save) {
        const conditionFormat = sheet.luckysheet_conditionformat_save;
        
        const conditionalFormatting: IConditionFormattingRule[] =  conditionFormat.map((condition) => {
            const type = condition.type;
            let conditionalFormattingInfo = null;
            switch (type) {
                case 'default':
                    conditionalFormattingInfo = defaultCondition(condition)
                    break;
                // case 'dataBar':
                //     dataBarCondition(worksheet, worksheetData, condition)
                //     break;
                // case 'icons':
                //     iconSetCondition(worksheet, worksheetData, condition)
                //     break;
                // case 'colorGradation':

                //     colorGradationCondition(worksheet, worksheetData, condition)
                //     break;

                default:
                    break;
            }

            return conditionalFormattingInfo
        }).filter((item) => item !== null);

        return conditionalFormatting;
    }

    return null;
}

function defaultCondition(condition: IluckysheetConditionFormat) {

    const conditionName = condition.conditionName;

    let conditionalFormattingInfo = null;

    switch (conditionName) {
        // case 'greaterThan':
        // case 'lessThan':
        // case 'equal':
        //     conditionalFormattingInfo = conditional(conditionName, 'cellIs', condition)
        //     break;
        case 'betweenness':
            const {cellrange, conditionValue} = condition;
            const format = condition.format as IluckysheetCFDefaultFormat;

            const cfId = generateRandomId(8);
            const ranges = rangeArrayToRanges(cellrange);

            const rule: INumberHighlightCell = {
                type: CFRuleType.highlightCell,
                subType: CFSubRuleType.number,
                operator: CFNumberOperator.between,
                style: {
                    cl: {
                        rgb: format.textColor
                    },
                    bg: {
                        rgb: format.cellColor
                    }
                },
                value: conditionValue as [number, number] || []
            }

            conditionalFormattingInfo = {
                cfId,
                ranges,
                rule,
                stopIfTrue: false
            }
            break;

        // case 'textContains':
        //     conditionalFormattingInfo = conditional('containsText', 'containsText', condition)
        //     break;
        // case 'occurrenceDate':
        //     // not support
        //     break;
        // case 'duplicateValue':
        //     // not support
        //     break;
        // case 'top10':
        // case 'top10%':
        // case 'last10':
        // case 'last10%':
        //     conditionalFormattingInfo = top10(conditionName, condition)
        //     break;
        // case 'AboveAverage':
        //     conditionalFormattingInfo = aboveAverage(conditionName, condition)
        //     break;
        // case 'SubAverage':
        //     conditionalFormattingInfo = aboveAverage(conditionName, condition)
        //     break;

        default:
            break;
    }

    return conditionalFormattingInfo
    
}
