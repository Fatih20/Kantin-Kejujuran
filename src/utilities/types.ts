const possibleAppStateList = ["startPage", "trade"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];