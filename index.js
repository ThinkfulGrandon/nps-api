"use strict";

const apiKey = "lBL0PD3dU0BOi2fbb5rVb7nLRnaEgaFwX8joypzw";
const url = "https://developer.nps.gov/api/v1/parks?";


function showResults(responseJson, length) {
    for (let i = 0; i < length; i++) {
        $('.results').append(`
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
        <p>Address: ${responseJson.data[i].addresses[0].line1} ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</p>
        <hr>
        `)
    }
}

function decideLimit(responseJson) {
    console.log(responseJson);
    // console.log(typeof responseJson.total);
    // console.log(typeof responseJson.limit);
    let x = parseInt(responseJson.total, 10);
    let y = parseInt(responseJson.limit, 10);
    // console.log(typeof x);
    // console.log(x);
    
    if (x > y) {
        console.log('first');
        let length = y;
        showResults(responseJson, length);
    } else if ( x < y) {
        console.log('second');
        let length = x;
        showResults(responseJson, length);
    }
}

function makeRequest(searchQuery) {
    fetch(searchQuery)
    .then(response => response.json())
    .then(responseJson => decideLimit(responseJson))
    .catch(err => {
        $('.results').text(`Oops there was a problem getting the data!`)
    })
}

function formatSearch(state, max) {
    //console.log(`params to be passed ${state} and ${max}`)
    let params = {
        stateCode: state,
        limit: max,
        api_key: apiKey
    };
    let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    queryItems = queryItems.join('&');
    queryItems = queryItems.replaceAll("%2C", ",");
    //console.log(queryItems);
    let searchQuery = url + queryItems;
    //console.log(searchQuery);
    makeRequest(searchQuery);
}

function formatParams() {
        let state = $('#jsStateSearch').val();
        state = state.toUpperCase().replaceAll(" ", ",");
        //console.log("---------" + state);
        let max = $('#jsMaxResults').val();
        formatSearch(state, max);
}

function formSubmit() {
    $('.form').on('submit', event => {
        event.preventDefault();
        $('.results').empty();
        formatParams();
        clearSearch();
    })    
};

function clearSearch() {
    $('#jsStateSearch').val("");
};

// ------------Callback-----------

function runApp() {
    formSubmit();
}

$(runApp())

