import type { OverlayEventText, SortingTextObject } from "../utilities/types";

export const showResultInOverayDuration = 500;
export const successTextDuration = 1000;
export const maxNameLength = 40;
export const maxDescriptionLength = 100;
export const validImageExtensionList = ["png", "jpg", "jpeg"] as const;
export const overlayEventText = {
    logout : {
        inactive : "",
        ongoing : "Logging you out",
        success : "Log out successful",
        fail : "Log out failed"
    },
    purchase : {
        fail : "Your purchase has just failed. Please try again.",
        success : "Succesfully bought the item!",
        ongoing : "Processing your purchase",
        inactive : ""
    }, 
    deleteAccount : {
        fail : "Failed at deleting your account. Please try again.",
        inactive : "",
        ongoing : "Deleting your account",
        success : "Your account have been deleted"
    },
    none : {
        fail : "",
        inactive : "",
        ongoing : "",
        success : ""
    }
} as OverlayEventText;

export const sortingText = {
    date: {
      ascending: "From oldest",
      descending: "From newest",
    },
    name: {
      ascending: "Alphabetical order",
      descending: "Reverse alphabetical order",
    },
    price: {
      ascending: "From least expensive",
      descending: "From most expensive",
    },
  } as SortingTextObject;
