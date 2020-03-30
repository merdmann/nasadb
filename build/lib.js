export const API_KEY = "lPgKs6fcVeWbGp9jy8eP9P5vzOKoNarMtFLn9798";
/**
 * this function is called to retrive the API data from the service provider.
 * @param {*} url
 */
export function fetchData(url) {
    fetch(url + '?api_key=' + API_KEY).then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
        console.log(myJson);
        //ProcessAndRender(myJson)
    })
        .catch(err => console.log(err));
}
