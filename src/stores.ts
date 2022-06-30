import { writable } from "svelte/store";
import type { PossibleAppState } from "./utilities/types";

export const appState = writable("trade" as PossibleAppState)