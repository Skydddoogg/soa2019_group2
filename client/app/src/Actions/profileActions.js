import fetch from 'isomorphic-fetch';

export function getProfile(userId) {
    return fetch('http://localhost:3006/' + userId)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}