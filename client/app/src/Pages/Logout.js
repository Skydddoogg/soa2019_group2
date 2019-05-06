import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Logout extends Component{
  
    render(){
        localStorage.setItem('token', null)
        localStorage.setItem('userId', null)
        return <Redirect to='/' />
    }
}