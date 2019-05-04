import fetch from 'isomorphic-fetch';

export function createComment(data) {
    return fetch('http://localhost:3004/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}

export function getReviews(targetId) {
    return fetch('http://localhost:3004/reviews/' + targetId)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}