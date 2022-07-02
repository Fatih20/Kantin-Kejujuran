export const initialStoreBalance = 100000;
export const maxNameLength = 40;
export const maxDescriptionLength = 100;
export const initialSortCondition = [true, true];
export const validImageExtensionList = ["png", "jpg", "gif", "jpeg"] as const;
export const backendAddress = "https://honest-canteen-backend.herokuapp.com";
export const successTextDuration = 500;
export const CLIENT_ID = "ea5aa6188ebef8e";
export const CLIENT_SECRET = "98ea9ed9b5aa006fb87f29da267273a34a5fccc6";
export const IMGUR_API_ADDRES = "https://api.imgur.com/3";
export const callLimit = 5;
export const PUBLITIO = {
    key : "TpQnPPsdojHmBPu6GNl6",
    secret : "A6mBbnVlVMHqB6PXH236T0GP5gpti6xj",
    endpoint : "https://api.publit.io",
    signature : "&api_signature=b4651500871524923a511b533beef643aa154ac2&api_key=TpQnPPsdojHmBPu6GNl6&api_nonce=95937314&api_timestamp=1656792338"
}

export const publitioAuthenticationParameter = (random8DigitNumber : number, date : number) => `?api_key=${PUBLITIO.key}&api_nonce=${PUBLITIO.key}&api_signature=${PUBLITIO.signature}&api_timestamp=${date}`;

export const IMGBB_API_KEY = "f96998ca2f1dbe0ef083206ff9aa7c46";
export const IMGBB_ADDRESS = "https://api.imgbb.com/1";
export const CLOUDINARY = {
    name : "dby0aipeg",
    secret : "FUZ5__NZdewN-udlGXYkM45Pabk",
    key : "651624712522533",
    preset : "phyfm8du",
    path : "https://api.cloudinary.com/v1_1/"
}
