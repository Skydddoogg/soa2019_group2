import fetch from 'isomorphic-fetch';

export function createComment(data, token) {
    return fetch('http://35.240.240.164:3000/api/review/create', {
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

export function getReviews(targetId) {
    return fetch('http://35.240.240.164:3000/api/review/reviews/' + targetId)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}