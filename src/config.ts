export const shootToProduction = true;
export const initialStoreBalance = 100000;
export const maxNameLength = 40;
export const maxDescriptionLength = 100;
export const initialSortCondition = [true, true];
export const validImageExtensionList = ["png", "jpg", "gif", "jpeg"] as const;
export const backendAddress = shootToProduction ? "https://honest-canteen-backend.herokuapp.com" : "localhost:3000";
export const showBuyingResultDuration = 500;
export const successTextDuration = 1000;
export const callLimit = 5;
export const CLOUDINARY = {
    name : "dby0aipeg",
    secret : "FUZ5__NZdewN-udlGXYkM45Pabk",
    key : "651624712522533",
    preset : "phyfm8du",
    path : "https://api.cloudinary.com/v1_1/"
}
export const maxIDLength = 5;
export const maxPasswordLength = 254;
export const OPTIONS = {
    headers : {'Content-Type' : 'application/json'},
    withCredentials : true
}