import fetch from 'isomorphic-fetch';

export function createComment(data) {
    return fetch('http://localhost:3004/api/review/create', {
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