import fetch from 'isomorphic-fetch';

export function handleLogin(data){
    return fetch('http://localhost:3003/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then((responseData) => {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userId', responseData.payload.userId);
            console.log(localStorage.getItem('userId'))
        })
    }).catch(err => {
        console.log(err)
    });
}