const apiKey = "lBL0PD3dU0BOi2fbb5rVb7nLRnaEgaFwX8joypzw";
const url = "https://developer.nps.gov/api/v1/parks?";


function showResults(responseJson) {
    console.log(responseJson);
    for (i = 0;i < responseJson.total; i++) {
        console.log(i);
        $('.results').append(`
        
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">Website</a></p>
        <hr>
        `)
    }
}

function makeRequest(searchQuery) {
    fetch(searchQuery)
    .then(response => response.json())
    .then(responseJson => showResults(responseJson));
}

function formatSearch(state, max) {
    console.log(`params to be passed ${state} and ${max}`)
    let params = {
        stateCode: state,
        limit: max,
        api_key: apiKey
    };
    let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    queryItems = queryItems.join('&');
    console.log(queryItems);
    let searchQuery = url + queryItems;
    console.log(searchQuery);
    makeRequest(searchQuery);
}

function formatParams() {
        let state = []
        let stateparam =$('#jsStateSearch').val();
        stateparam = stateparam.toUpperCase().replaceAll(" ", ",");
        state.push(stateparam);
        console.log(state)
        let max = $('#jsMaxResults').val();
        max = String(max);
        formatSearch(state, max);  
}

function formSubmit() {
    $('.form').on('submit', event => {
        event.preventDefault();
        $('.results').empty();
        formatParams();
    })    
};
// ------------Callback-----------

function runApp() {
    formSubmit();
}

$(runApp())



// https://developer.nps.gov/api/v1/parks?stateCode=CA,CT&api_key=lBL0PD3dU0BOi2fbb5rVb7nLRnaEgaFwX8joypzw
// https://developer.nps.gov/api/v1/parks?stateCode=CA,CT&api_key=lBL0PD3dU0BOi2fbb5rVb7nLRnaEgaFwX8joypzw