const possibleAppStateList = ["startPage", "main"] as const;

export type PossibleAppState = typeof possibleAppStateList[number];