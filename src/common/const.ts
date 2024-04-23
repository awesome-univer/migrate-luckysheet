import { LocaleType } from "@univerjs/core"

export const fontFamilyMap: Record<string,string> = {
    '0': 'Times New Roman',
    '1': 'Arial',
    '2': 'Tahoma',
    '3': 'Verdana',
    '4': 'Microsoft YaHei',
    '5': 'SimSun',
    '6': 'SimHei',
    '7': 'Kaiti',
    '8': 'FangSong',
    '9': 'NSimSun',
    '10': 'STXinwei',
    '11': 'STXingkai',
    '12': 'STLiti'
}

export const localeMap: {[key:string]: LocaleType} = {
    'zh': LocaleType.ZH_CN,
    'en': LocaleType.EN_US,
}
