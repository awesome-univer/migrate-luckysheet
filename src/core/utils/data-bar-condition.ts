import { generateRandomId } from "@univerjs/core";
import { IluckysheetConditionFormat } from "../../common/interface/condition-format";
import { rangeArrayToRanges } from "../../common/utils/selection";
import { CFRuleType, CFValueType, IDataBar } from "@univerjs/sheets-conditional-formatting";

/**
 * The two values ​​of format represent the starting and ending colors of the gradient, as shown below:
    "format": [
        "#6aa84f",
        "#ffffff"
    ]

    The single value of format represents a single color, as shown below:
    "format": [
        "#6aa84f"
    ]
 * @param condition 
 */
export function dataBarCondition(condition: IluckysheetConditionFormat) {
    const { cellrange } = condition;
    const format = condition.format as string[];

    const cfId = generateRandomId(8);
    const ranges = rangeArrayToRanges(cellrange);

    const rule: IDataBar = {
        type: CFRuleType.dataBar,
        config: {
            min: {
                type: CFValueType.min,
                value: 0
            },
            max: {
                type: CFValueType.max,
                value: 100
            },
            isGradient: format.length === 2,
            positiveColor: format[0],
            nativeColor: '#ff0000', // The native color of Luckysheet is a fixed value
        },
        isShowValue: true,
    }

    return {
        cfId,
        ranges,
        rule,
        stopIfTrue: false
    }
}