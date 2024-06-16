const apiKey = "7ea73364a0ff42b097cf4fc044d4bbfb";
const baseUrl = "https://api.twelvedata.com/mutual_funds";

const listEndpoint = "/list";
const countryParam = "country=Canada";
const countParam = "outputsize=10";

export function getAllFunds() {
    return fetch(`${baseUrl}${listEndpoint}?apikey=${apiKey}&${countryParam}`)
        .then(response => response.json())
        .then(data => data?.result?.list);
}