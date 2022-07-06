import { backendAddress, OPTIONS } from "../config";
import axios from "axios";
import type { User } from "./types";

export async function login (loggingUser : User) {
    const data = await axios.post(`${backendAddress}/user/login`, loggingUser, OPTIONS);

    return data;
}

export async function register (registeringUser : User) {
    const data = await axios.post(`${backendAddress}/user/register`, registeringUser, OPTIONS);

    return data;
}

export async function getMe () {
    const data = await axios.get(`${backendAddress}/user/me`, OPTIONS);
    return data;
}

export async function logout () {
    const data = await axios.post(`${backendAddress}/user/logout`, {}, OPTIONS);
    return data;
}

export async function deleteAccount () {
    const data = await axios.delete(`${backendAddress}/user/delete`, OPTIONS);
    return data;
}