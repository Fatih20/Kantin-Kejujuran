import { writable } from "svelte/store";
import { initialStoreBalance } from "./config";
import type { PossibleAppState } from "./utilities/types";
import { fetchItemFromLocalStorage } from "./utilities/utilities";

function createStoreBalance () {
    const {subscribe, set, update} = writable(fetchStoreBalanceFromLocalStorage());

    function fetchStoreBalanceFromLocalStorage() {
    const candidateStoreBalance = fetchItemFromLocalStorage("storeBalance");
    return (candidateStoreBalance ?? initialStoreBalance) as number;
    }

    function add (increment) {
        update (previousBalance => {
            const newValue = previousBalance + increment
            localStorage.setItem("storeBalance", JSON.stringify(newValue));
            return newValue
        })
    }

    function subtract (increment) {
        update (previousBalance => {
            const newValue = previousBalance - increment
            localStorage.setItem("storeBalance", JSON.stringify(newValue));
            return newValue
        })
    }

    
    async function reset () {
        const newSavedGame = initialStoreBalance;
        localStorage.removeItem("savedGame");
        set(newSavedGame);
    }

    function removeFromLocalStorage() {
        localStorage.removeItem("savedGame");
    }

    return {
        subscribe,
        reset,
        set,
        update,
        add,
        subtract,
        removeFromLocalStorage,
    }
}

export const appState = writable("trade" as PossibleAppState)
export const storeBalance = createStoreBalance();