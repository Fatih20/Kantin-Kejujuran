import type { PossibleAppState } from "../utilities/types";

export const isInProduction = false;
export const startPageInDevelopment = "trade" as PossibleAppState;
export const shootToProduction = true;
export const backendAddress = shootToProduction ? "https://honest-canteen-backend.herokuapp.com" : "localhost:3000";

export const imageUploadcallLimit = 5;
export const CLOUDINARY = {
    name : "dby0aipeg",
    secret : "FUZ5__NZdewN-udlGXYkM45Pabk",
    key : "651624712522533",
    preset : "phyfm8du",
    path : "https://api.cloudinary.com/v1_1/"
}
export const apiOPTIONS = {
    headers : {'Content-Type' : 'application/json'},
    withCredentials : true
}
export const maxIDLength = 5;
export const maxPasswordLength = 254;

