import React, { Component } from 'react'
import { ActiveButton, NonActiveButton } from '../Button/Button'
import styled from 'styled-components'
import { RegisterInputElement } from '../FormElements/RegisterInputElement'
import {handleLogin} from '../../Actions/loginAction'
var LoginForm = styled.form`
width:90%;
margin:auto;
background-color:#fff;
border-radius:10px;
padding:5% 5% 5% 5%;

    & > h1{
        font-family:prompt;
        color:#008FF6;
        font-size:3em;
        padding-bottom:10px;
        margin:0;
        margin-bottom:10px;
        text-align:center;
    }
`


export default class LoginBox extends Component {
    handleUsername = e =>{
        this.setState({
            username:e.target.value
        })
    }
    
    handlePassword = e =>{
        this.setState({
            password:e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            username:this.state.username,
            password:this.state.password
        }
        handleLogin(data)
    }

    constructor(props){
        super(props)
        this.state ={
            username:'',
            password:''
        }
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit}>
                <h1>เข้าสู่ระบบ</h1>
                <RegisterInputElement width="100" marginBottom={5}>
                    <label>ชื่อผู้ใช้ </label>
                    <input type="text" name="username" onChange={this.handleUsername} value={this.state.username}   />
                </RegisterInputElement>
                <RegisterInputElement width="100" marginBottom={5}>
                    <label>รหัสผ่าน </label>
                    <input type="password" name="password" onChange={this.handlePassword} value={this.state.password}  />
                </RegisterInputElement>
                <NonActiveButton width="100" style={{marginBottom:15}}>เข้าสู่ระบบ</NonActiveButton>
                <ActiveButton width="100">สมัครสมาชิก</ActiveButton>
            </LoginForm>
        )
    }
}

