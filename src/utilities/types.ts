const possibleAppStateList = ["startPage", "trade", "add", "login", "register"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];

const possibleFooterStateList = ["default", "take", "give"] as const;

export type PossibleFooterState = typeof possibleFooterStateList[number];

const possibleInputProblemList = ["none", "overdraw", "NaN", "negative", "undefined"] as const;
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

export const possibleSortOrderList = ["ascending", "descending"] as const;
export type PossibleSortOrder = typeof possibleSortOrderList[number];

export const possibleSortByList = ["date", "price", "name"] as const;
export type PossibleSortBy = typeof possibleSortByList[number];

export const referenceKeyToSort = {
    "price" : "price",
    "name" : "name",
    "date" : "milisecondcreated"
} as Record<PossibleSortBy, keyof ISoldItem>;

export type SortTextForEachSortBy = Record<PossibleSortOrder, string>
export type SortingTextObject = Record<PossibleSortBy, SortTextForEachSortBy>

export type SortingCondition = [PossibleSortBy, PossibleSortOrder];
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

const possiblePasswordProblemList = ["none", "long", "empty"] as const;
export type PossiblePasswordProblem = typeof possiblePasswordProblemList[number];

const possibleIDProblemList = ["none", "empty", "invalid"] as const;
export type PossibleIDProblem = typeof possibleIDProblemList[number];

export type User = {
    student_id : string,
    password : string
}

export type UserOpaque = Omit<User, "password"> & {
    password : undefined
}

const possibleLoginErrorPositionList = ["Checking uniqueness", "Getting new password", "Done"] as const;

export type LoginErrorPosition = typeof possibleLoginErrorPositionList[number];

const possibleLoginErrorManMadeList = ["notRegistered", "wrongPassword"] as const;

export type LoginErrorManMade = (typeof possibleLoginErrorManMadeList[number])

const possibleRegisterErrorManMadeList = ["registeredAlready"] as const;
export type RegisterErrorManMade = (typeof possibleRegisterErrorManMadeList[number]);

export type PossibleAuthenticationErrorManMade = LoginErrorManMade | RegisterErrorManMade;

const overlayEventStateList = ["inactive", "ongoing", "fail", "success"] as const;

export type OverlayEventState = typeof overlayEventStateList[number];

const possibleOverlayEvent = ["none" ,"logout", "deleteAccount", "purchase"] as const;

export type OverlayEvent = typeof possibleOverlayEvent[number];

export type OverlayState = {
    "event" : OverlayEvent,
    "state"  : OverlayEventState
};

export type OverlayEventText = Record<OverlayEvent , Record<OverlayEventState, string>>