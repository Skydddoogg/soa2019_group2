import fetch from 'isomorphic-fetch';

export function handleLogin(data){
    return fetch('http://35.240.240.164:3000/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then((responseData) => {
            localStorage.setItem('token', responseData.token);
            if(responseData.payload != null){
            localStorage.setItem('userId', responseData.payload.userId);
            }
        })
        return res.status
    }).catch(err => {
        console.log(err)
    });
}