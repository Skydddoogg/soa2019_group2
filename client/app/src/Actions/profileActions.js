import fetch from 'isomorphic-fetch';

export function getProfile(userId) {
    return fetch('http://35.240.240.164:3000/api/profile' + userId)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
}