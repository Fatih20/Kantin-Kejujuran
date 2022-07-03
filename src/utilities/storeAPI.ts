import axios from "axios";
import { backendAddress } from "../config";
import type { IAPIReturn, ISoldItem, ISoldItemRaw } from "./types";

export const OPTIONS = {
    headers : {'Content-Type' : 'application/json'},
    withCredentials : true
}

export async function getBalance() {
    const {data : {error, message, response}} : {data : IAPIReturn<number>} = await axios.get(`${backendAddress}/store/balance`, OPTIONS);
    
    if (error !== null) {
        throw new Error("Failed to get balance")
    }
    return response as number;
}   

export async function incrementBalance(increment : number) {
     const {data : {error, message, response}} : {data : IAPIReturn<any>} = await axios.put(`${backendAddress}/store/balance`, {"balanceIncrement" : increment}, OPTIONS);
     if (error !== null) {
         throw new Error("Failed to increment balance")
     }

     return response;
}

export async function getAllItems () {
    const {data : {error, message, response}} : {data : IAPIReturn<ISoldItemRaw[]>} = await axios.get(`${backendAddress}/store/allItems`, OPTIONS);

    if (error !== null) {
        throw new Error("Failed to get all items");
    }

    return response as ISoldItemRaw[];
    
}

export async function buyItem (boughtItem : ISoldItemRaw) {
    const {data : {error, message, response}} : {data : IAPIReturn<ISoldItemRaw[]>} = await axios.put(`${backendAddress}/store/buyItem`, {boughtItem}, OPTIONS);

    if (error !== null) {
        throw new Error("Failed to buy item");
    }

    return response;
}

export async function addItem (addedItem : ISoldItem) {
    const {data : {error, message, response}} = await axios.post(`${backendAddress}/store/addItem`, {addedItem}, OPTIONS);

    if (error !== null) {
        throw new Error("Failed to add item");
    }

    console.log(response);

    return response;
}