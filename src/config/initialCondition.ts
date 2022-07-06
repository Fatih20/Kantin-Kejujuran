import type { OverlayState, SortingCondition } from "../utilities/types";

export const initialSortCondition = ["date", "ascending"] as SortingCondition;
export const initialOverlayState = {event : "none", state : "inactive"} as OverlayState;