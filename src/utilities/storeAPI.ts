import axios from "axios";
import { backendAddress } from "../config";
import type { IAPIReturn } from "./types";

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