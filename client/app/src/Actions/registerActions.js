import fetch from 'isomorphic-fetch';

export function createUser(data) {
    return fetch('http://localhost:3003/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res)
        return res;
    }).catch(err => {
        console.log(err)
    });
}
