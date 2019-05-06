import fetch from 'isomorphic-fetch';
import { Redirect } from 'react-router-dom'
import React, { Component }  from 'react';
export function createUser(data) {
     return fetch('http://35.240.240.164:3000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.status;
    }).catch(err => {
        return err.status
    });
}
