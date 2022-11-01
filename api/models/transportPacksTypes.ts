import { Number } from "mongoose";

export enum transportPackUnitTypes {
    KILOGRAMS = 'KILOGRAMS',
    OUNCES = 'OUNCES',
    POUNDS = 'POUNDS'
}

export function convert(from: String, to: String, value: number): number {

    if (from  === to) {
        return value;
    }
    let factor = 1;
    switch(`${from}-${to}`) {
        case `${transportPackUnitTypes.KILOGRAMS}-${transportPackUnitTypes.OUNCES}`:
            factor = 35.274;
            break;
        case `${transportPackUnitTypes.POUNDS}-${transportPackUnitTypes.OUNCES}`:
            factor = 16;
            break;
        case `${transportPackUnitTypes.KILOGRAMS}-${transportPackUnitTypes.POUNDS}`:
            factor = 2.20462;
            break;
        case `${transportPackUnitTypes.OUNCES}-${transportPackUnitTypes.POUNDS}`:
            factor = 0.0625;
            break;
        case `${transportPackUnitTypes.POUNDS}-${transportPackUnitTypes.KILOGRAMS}`:
            factor = 0.453592;
            break;
        case `${transportPackUnitTypes.OUNCES}-${transportPackUnitTypes.KILOGRAMS}`:
            factor = 0.0283495;
            break;
    }
    return factor*value;
}