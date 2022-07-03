import axios from "axios";
import { CLOUDINARY, validImageExtensionList } from "../config";
import type { ISoldItem, ISoldItemLite } from "./types";

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
        const testedRegex = new RegExp(`\\.${validImageExtension}+$`)
        if (testedRegex.test(imageName)) {
            return true;
        }
    }
    return false;
}

export function objToString(obj, ndeep) {
    switch(typeof obj){
      case "string": return '"'+obj+'"';
      case "function": return obj.name || obj.toString();
      case "object":
        var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
        return ('{['[+isArray] + Object.keys(obj).map(function(key){
             return '\n\t' + indent +(isArray?'': key + ': ' )+ objToString(obj[key], (ndeep||1)+1);
           }).join(',') + '\n' + indent + '}]'[+isArray]).replace(/[\s\t\n]+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/g,'');
      default: return obj.toString();
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export async function errorHandlingWrapperCloudinary (formdata : FormData) {
    try {
        const response = await axios.post(`${CLOUDINARY.path}${CLOUDINARY.name}/image/upload`, formdata);
        return {
            statusCode : response.status,
            isError : false,
            error : null,
            retrievedData : response.data
        };
    } catch (error) {
        return {
            statusCode : error.response.status,
            isError : true,
            error : error,
            retrievedData : null
        };
    }
}

export async function fetchDataRetry (functionToCall : () => Promise<any>, timesFunctionIsCalled : number, limitOfCalling : number) : Promise<any>{
    const response = await functionToCall();
    if (response.statusCode < 500) {
        return response;
    }

    if (timesFunctionIsCalled < limitOfCalling) {
        return fetchDataRetry(functionToCall, timesFunctionIsCalled + 1, limitOfCalling)
    }

    return response;
}  

export function fillItemInfo (addedItem : ISoldItemLite) {
        const date = new Date()
        const datecreated = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        const timeAppendedNewSoldItem = {...addedItem, datecreated, milisecondcreated : date.getTime()} as ISoldItem;
        return timeAppendedNewSoldItem;
}