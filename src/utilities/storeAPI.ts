import axios from "axios";
import { backendAddress } from "../config";

export const OPTIONS = {
    headers : {'Content-Type' : 'application/json'},
    withCredentials : true
}

export async function getBalance() {
    return await axios.get(`${backendAddress}/store/balance`, OPTIONS);
}   

export async function incrementBalance(increment : number) {
    return await axios.put(`${backendAddress}/store/balance`, {"balanceIncrement" : increment}, OPTIONS);
}