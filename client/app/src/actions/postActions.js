import fetch from 'isomorphic-fetch';

export function createFindingTutorPost(data) {
    return fetch('http://localhost:3000/api/post/create', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}