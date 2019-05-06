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


export function createOffer(userId) {
    return fetch('http://localhost:3005/create', {
        method: 'POST',
        body: JSON.stringify(userId),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}