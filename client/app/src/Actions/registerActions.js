import fetch from 'isomorphic-fetch';

export function createUser(data) {
    console.log(data)
    return fetch('http://35.240.240.164:3000/api/auth/signup', {
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
