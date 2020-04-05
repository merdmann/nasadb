
export const API_KEY = "lPgKs6fcVeWbGp9jy8eP9P5vzOKoNarMtFLn9798";

/**
 * this function is called to retrive the API data from the service provider.
 * https://blog.logrocket.com/async-await-in-typescript/
 * 
 * @param {*} url
 */
export async function api_get(url : string) {
  const response = await fetch(url + "?api_key=" + API_KEY)
  const body = await response.json();
  return body;
}