import fetch from 'isomorphic-fetch';

export function createFindingTutorPost(data) {
    return fetch('http://35.240.240.164:3000/api/post/create', {
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

export function editFindingTutorPost(data, postId) {
    return fetch('http://localhost:3000/api/post/update/' + postId, {
        method: 'PUT',
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

export function removePost(postId) {
    return fetch('http://localhost:3000/api/post/delete/' + postId, {
        method: 'DELETE',
    }).then(res => {
        return res;
    }).catch(err => {
        console.log(err)
    });
}

export function getAllPosts(userId) {
    return fetch('http://localhost:3000/api/post/' + userId + '/allpost')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(posts) {
        console.log(posts);
    });
}
