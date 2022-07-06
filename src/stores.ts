import { writable } from "svelte/store";
import { initialSortCondition, isInProduction, startPageInDevelopment } from "./config";
import { PossibleAppState, possibleSortByList, SortingCondition } from "./utilities/types";
import { fetchItemFromLocalStorage } from "./utilities/utilities";

function createSortCondition () {
    const {subscribe, set, update } = writable(initializeSortCondition());

    function initializeSortCondition() {
        const newSortCondition = (fetchItemFromLocalStorage("sortCondition") ?? initialSortCondition) as SortingCondition;
        localStorage.setItem("sortCondition", JSON.stringify(newSortCondition));
        return newSortCondition;
    }

function cycleSortBy (cycleUp : boolean = true) {
        update(previousSortCondition => {
            let newIndex = possibleSortByList.indexOf(previousSortCondition[0]) + (cycleUp ? 1 : -1);
            newIndex = newIndex < 0 ? (possibleSortByList.length - 1) : newIndex % possibleSortByList.length;
            previousSortCondition[0] = possibleSortByList[newIndex]
            localStorage.setItem("sortCondition", JSON.stringify(previousSortCondition));
            return previousSortCondition
        })
    }

    function alternateSortOrder () {
        update(previousSortCondition => {
            if (previousSortCondition[1] === "ascending") {
                previousSortCondition[1] = "descending"; 
            } else {
                previousSortCondition[1] = "ascending"; 
            }
            localStorage.setItem("sortCondition", JSON.stringify(previousSortCondition));
            return previousSortCondition
        })

    }

    return {
        subscribe,
        set,
        update,
        cycleSortBy,
        alternateSortOrder
    }
}

export const appState = writable(isInProduction ? "startPage" : startPageInDevelopment as PossibleAppState);
export const sortCondition = createSortCondition();
export const buyingProcess = writable(false);
export const justFailedBuying = writable(false);
export const showBuyingResultText = writable(false);
export const isLoggingOut = writable(false);
export const justFailedLogout = writable(false);
export const showLogoutResultText = writable(false);