import { writable } from "svelte/store";
import { initialStoreBalance } from "./config";
import type { ISoldItem, ISoldItemLite, PossibleAppState } from "./utilities/types";
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
        localStorage.removeItem("storeBalance");
        set(initialStoreBalance);
    }

    function removeFromLocalStorage() {
        localStorage.removeItem("storeBalance");
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

function createSoldItemList () {
    const {subscribe, set, update} = writable(fetchSoldItemListFromLocalStorage());

    function fetchSoldItemListFromLocalStorage() {
    const candidateSoldItemList = fetchItemFromLocalStorage("soldItemList");
    return (candidateSoldItemList ?? []) as ISoldItem[];
    }

    function insert (newSoldItem : ISoldItemLite) {
        update (previousSoldItemList => {
            const date = new Date()
            const dateCreated = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMonth()}`
            const timeAppendedNewSoldItem = {...newSoldItem, dateCreated, milisecondCreated : date.getTime()} as ISoldItem;
            const newSoldItemList = [...previousSoldItemList, timeAppendedNewSoldItem]
            localStorage.setItem("soldItemList", JSON.stringify(newSoldItemList));
            return newSoldItemList;
        })
    }

    function remove (removedSoldItem : ISoldItem) {
        update (previousSoldItemList => {
            const newSoldItemList = previousSoldItemList.filter((soldItem) => JSON.stringify(soldItem) !== JSON.stringify(removedSoldItem)
            );
            localStorage.setItem("soldItemList", JSON.stringify(newSoldItemList));
            return newSoldItemList;
        })
    }

    
    async function reset () {
        localStorage.removeItem("soldItemList");
        set([] as ISoldItem[]);
    }

    function removeFromLocalStorage() {
        localStorage.removeItem("soldItemList");
    }

    return {
        subscribe,
        reset,
        set,
        update,
        insert,
        remove,
        removeFromLocalStorage,
    }
}

export const appState = writable("trade" as PossibleAppState)
export const soldItemList = createSoldItemList();
export const storeBalance = createStoreBalance();