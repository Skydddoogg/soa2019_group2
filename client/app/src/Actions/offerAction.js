import fetch from 'isomorphic-fetch';

export function getStudentOffer(userId) {
    return fetch('http://localhost:3005/' + userId)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}


export function createOffer(data, token) {
    return fetch('http://35.240.240.164:3000/api/offer/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}