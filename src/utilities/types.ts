const possibleAppStateList = ["startPage", "trade", "add", "login", "register"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];

const possibleFooterStateList = ["default", "take", "give"] as const;

export type PossibleFooterState = typeof possibleFooterStateList[number];

const possibleInputProblemList = ["none", "overdraw", "NaN", "negative"] as const;
export type PossibleInputProblem = typeof possibleInputProblemList[number];

export interface ISoldItemLite {
    name : string,
    imagelink : string,
    description : string,
    price : number,
}

export interface ISoldItem extends ISoldItemLite {
    milisecondcreated : number,
    datecreated : string,
}

export interface ISoldItemRaw extends ISoldItem {
    id : number
}

const possibleNameProblemList = ["none", "long", "empty"] as const;
export type PossibleNameProblem = typeof possibleNameProblemList[number];

export type SortingCondition = [boolean, boolean];
// The first is whether to sort by date or name, date = true. The second is whether to sort in ascending order

const possibleShelfState = ["all", "one"] as const;
export type ShelfState = typeof possibleShelfState[number];

const possibleAPIMethodList = ["post", "put", "get", "patch", "delete"] as const;
export type PossibleAPIMethodType = typeof possibleAPIMethodList[number];

export type IAPIReturn<T> = {
    error : any,
    message : string,
    response : T,
}

const possibleLoginProblemList = ["none", "wrongName", "wrongPassword", "notRegistered"] as const;
export type PossibleLoginProblem = typeof possibleLoginProblemList[number];

const possibleRegisterProblemList = ["none", "alreadyExist"] as const;
export type PosibleRegisterProblem = typeof possibleRegisterProblemList[number];