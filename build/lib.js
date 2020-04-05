var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const API_KEY = "lPgKs6fcVeWbGp9jy8eP9P5vzOKoNarMtFLn9798";
/**
 * this function is called to retrive the API data from the service provider.
 * https://blog.logrocket.com/async-await-in-typescript/
 *
 * @param {*} url
 */
export function api_get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url + "?api_key=" + API_KEY);
        const body = yield response.json();
        return body;
    });
}
