const possibleAppStateList = ["startPage", "trade"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];

const possibleFooterStateList = ["default", "take", "give"] as const;

export type PossibleFooterState = typeof possibleFooterStateList[number];

const possibleInputProblemList = ["none", "overdraw", "NaN", "negative"] as const;
export type PossibleInputProblem = typeof possibleInputProblemList[number];

export interface ISoldItemLite {
    name : string,
    // imageLink : string,
    description : string,
    price : number,

}

export interface ISoldItem extends ISoldItemLite {
    milisecondCreated : number,
    dateCreated : string,
}
