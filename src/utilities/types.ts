const possibleAppStateList = ["startPage", "trade"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];

const possibleFooterStateList = ["default", "withdraw", "input"];

export type PossibleFooterState = typeof possibleFooterStateList[number];