import { backendAddress, apiOPTIONS } from "../config/configTechnical";
import axios from "axios";
import type { User } from "./types";

export async function login (loggingUser : User) {
    const data = await axios.post(`${backendAddress}/user/login`, loggingUser, apiOPTIONS);

    return data;
}

export async function register (registeringUser : User) {
    const data = await axios.post(`${backendAddress}/user/register`, registeringUser, apiOPTIONS);

    return data;
}

export async function getMe () {
    const data = await axios.get(`${backendAddress}/user/me`, apiOPTIONS);
    return data;
}

export async function logout () {
    const data = await axios.post(`${backendAddress}/user/logout`, {}, apiOPTIONS);
    return data;
}

export async function deleteAccount () {
    const data = await axios.delete(`${backendAddress}/user/delete`, apiOPTIONS);
    return data;
}