import axios from "axios";
import { backendAddress, apiOPTIONS } from "../config/configTechnical";
import type { IAPIReturn, ISoldItem, ISoldItemRaw } from "./types";

export async function getBalance() {
    const {data : {error, message, response}} : {data : IAPIReturn<number>} = await axios.get(`${backendAddress}/store/balance`, apiOPTIONS);
    
    if (error !== null) {
        throw new Error("Failed to get balance")
    }
    return response as number;
}   

export async function incrementBalance(increment : number) {
     const {data : {error, message, response}} : {data : IAPIReturn<any>} = await axios.put(`${backendAddress}/store/balance`, {"balanceIncrement" : increment}, apiOPTIONS);
     if (error !== null) {
         throw new Error("Failed to increment balance")
     }

     return response;
}

export async function getAllItems () {
    const {data : {error, message, response}} : {data : IAPIReturn<ISoldItemRaw[]>} = await axios.get(`${backendAddress}/store/allItems`, apiOPTIONS);

    if (error !== null) {
        throw new Error("Failed to get all items");
    }

    return response as ISoldItemRaw[];
    
}

export async function buyItem (boughtItem : ISoldItemRaw) {
    const {data : {error, message, response}} : {data : IAPIReturn<ISoldItemRaw[]>} = await axios.put(`${backendAddress}/store/buyItem`, {boughtItem}, apiOPTIONS);

    if (error !== null) {
        throw new Error("Failed to buy item");
    }

    return response;
}

export async function addItem (addedItem : ISoldItem) {
    const {data : {error, message, response}} = await axios.post(`${backendAddress}/store/addItem`, {addedItem}, apiOPTIONS);

    if (error !== null) {
        throw new Error("Failed to add item");
    }


    return response;
}