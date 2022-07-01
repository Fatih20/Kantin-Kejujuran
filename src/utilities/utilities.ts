import { validImageExtensionList } from "../config";
import type { ISoldItem } from "./types";

export function priceDenominator (rawPrice : number) : string {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
    return formatter.format(rawPrice);
}

export function fetchItemFromLocalStorage (key : string){
    let candidateResult = localStorage.getItem(key);
    if (candidateResult !== undefined && candidateResult !== null) {
        return JSON.parse(candidateResult)
    } else {
        return undefined
    }
}

export function compareFunctionGenerator (isDate : boolean, isAscending : boolean) {
    // const keyOfComparedValue = (isDate ? "milisecondsCreated" : "name") as keyof ISoldItem
    const compareFunction = (isDate ? 
        (soldItem1 : ISoldItem, soldItem2 : ISoldItem) => {
        return soldItem1["milisecondCreated"] < soldItem2["milisecondCreated"] ? -1 : (soldItem1["milisecondCreated"] > soldItem2["milisecondCreated"] ? 1 : 0)
    } : (soldItem1 : ISoldItem, soldItem2 : ISoldItem) => {
        return soldItem1["name"] < soldItem2["name"] ? -1 : (soldItem1["name"] > soldItem2["name"] ? 1 : 0)
    })

    const alternateCompareFunction = (soldItem1 : ISoldItem, soldItem2 : ISoldItem) => {
        return -1 * compareFunction(soldItem1, soldItem2);
    }

    return isAscending ? compareFunction : alternateCompareFunction;
}

export function validImageChecker (imageName : string) {
    for (const validImageExtension of validImageExtensionList) {
        const testedRegex = new RegExp(`\\.${validImageExtensionList}+$`)
        if (testedRegex.test(imageName)) {
            return true;
        }
    }
    
    return false;
    
}
