import { storage } from "_constants";

export const getLocalStorage = (key) => {
  return localStorage[key ?? storage.ACCESS_TOKEN];
};
