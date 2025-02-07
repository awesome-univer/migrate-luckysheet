import { generateRandomId, IWorkbookData, IWorksheetData } from "@univerjs/core";
import { ILuckyJson } from "../common/interface/lucky-json";
import { ILuckySheet } from "../common/interface/lucky-sheet";
import { CFNumberOperator, CFRuleType, CFSubRuleType, CFTextOperator, IAverageHighlightCell, IConditionFormattingRule, IDuplicateValuesHighlightCell, INumberHighlightCell, IRankHighlightCell, ITextHighlightCell, IUniqueValuesHighlightCell } from "@univerjs/sheets-conditional-formatting";
import { rangeArrayToRanges } from "../common/utils/selection";
import { defaultCondition } from "./utils/default-condition";
import { dataBarCondition } from "./utils/data-bar-condition";
import { colorGradationCondition } from "./utils/color-gradation-condition";
import { iconSetCondition } from "./utils/icon-set-condition";

/**
 *  - Highlight Cell 
        - Greater than //
        - Less than //
        - Between //
        - Equal //
        - Text contains //
        - Date // TODO
        - Duplicate value //
    - Top/Bottom 
        - Top 10 //
        - Top 10% //
        - Bottom 10 //
        - Bottom 10% //
        - Above average //
        - Below average //
    - Data Bars // 
    - Color Scales //
    - Icon Sets // TODO

 * @param workbookData 
 * @param worksheetData 
 * @param luckyJson 
 * @param sheet 
 * @returns 
 */
export function conditionFormat(workbookData: Partial<IWorkbookData>, worksheetData: Partial<IWorksheetData>, luckyJson: Partial<ILuckyJson>, sheet: Partial<ILuckySheet>) {
    if (sheet.luckysheet_conditionformat_save) {
        const conditionFormat = sheet.luckysheet_conditionformat_save;

        const conditionalFormatting: IConditionFormattingRule[] = conditionFormat.map((condition) => {
            const type = condition.type;
            let conditionalFormattingInfo = null;
            switch (type) {
                case 'default':
                    conditionalFormattingInfo = defaultCondition(condition)
                    break;
                case 'dataBar':
                    conditionalFormattingInfo = dataBarCondition(condition)
                    break;
                case 'icons':
                    conditionalFormattingInfo = iconSetCondition(condition)
                    break;
                case 'colorGradation':
                    conditionalFormattingInfo = colorGradationCondition(condition)
                    break;

                default:
                    break;
            }

            return conditionalFormattingInfo
        }).filter((item) => item !== null);

        // Note that the corresponding order is reversed
        return conditionalFormatting.reverse();
    }

    return null;
}