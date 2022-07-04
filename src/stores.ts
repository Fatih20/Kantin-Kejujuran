import { writable } from "svelte/store";
import { initialSortCondition } from "./config";
import type { PossibleAppState, SortingCondition } from "./utilities/types";
import { fetchItemFromLocalStorage } from "./utilities/utilities";

function createSortCondition () {
    const {subscribe, set, update } = writable(initializeSortCondition());

    function initializeSortCondition() {
        const newSortCondition = (fetchItemFromLocalStorage("sortCondition") ?? initialSortCondition) as SortingCondition;
        localStorage.setItem("sortCondition", JSON.stringify(newSortCondition));
        return newSortCondition;
    }

    function alternateSortBy () {
        update(previousSortCondition => {
            previousSortCondition[0] = !previousSortCondition[0];
            localStorage.setItem("sortCondition", JSON.stringify(previousSortCondition));
            return previousSortCondition
        })
    }

    function alternateSortOrder () {
        update(previousSortCondition => {
            previousSortCondition[1] = !previousSortCondition[1];
            localStorage.setItem("sortCondition", JSON.stringify(previousSortCondition));
            return previousSortCondition
        })

    }

    return {
        subscribe,
        set,
        update,
        alternateSortBy,
        alternateSortOrder
    }
}

export const appState = writable("trade" as PossibleAppState)
export const sortCondition = createSortCondition();
export const buyingProcess = writable(false);
export const justFailedBuying = writable(false);
export const showBuyingResultText = writable(false);

export const mockLoginData = writable(true);