const possibleAppStateList = ["startPage", "trade"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];

const possibleFooterStateList = ["default", "take", "give"] as const;

export type PossibleFooterState = typeof possibleFooterStateList[number];