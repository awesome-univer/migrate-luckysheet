import { generateRandomId } from "@univerjs/core";
import { IColorScale, CFRuleType, CFValueType, IValueConfig } from "@univerjs/sheets-conditional-formatting";
import { IluckysheetConditionFormat } from "../../common/interface/condition-format";
import { rangeArrayToRanges } from "../../common/utils/selection";

export function colorGradationCondition(condition: IluckysheetConditionFormat) {
    const { cellrange } = condition;
    const format = condition.format as string[];

    const cfId = generateRandomId(8);
    const ranges = rangeArrayToRanges(cellrange);

    const config : {
            index: number;
            color: string;
            value: IValueConfig;
        }[] = [
        {
            color: format[0],
            value: {
                type: CFValueType.min,
                value: ""
            },
            index: 0
        },
    ];

    if(format.length === 2) {
        config.push({
            color: format[1],
            value: {
                type: CFValueType.max,
                value: ""
            },
            index: 1
        })
    }else if(format.length === 3){
        config.push({
            color: format[1],
            value: {
                type: CFValueType.percent,
                value: 50
            },
            index: 1
        })
        config.push({
            color: format[2],
            value: {
                type: CFValueType.max,
                value: ""
            },
            index: 2
        })
    }

    const rule: IColorScale = {
        type: CFRuleType.colorScale,
        config
    }

    return {
        cfId,
        ranges,
        rule,
        stopIfTrue: false
    }
}