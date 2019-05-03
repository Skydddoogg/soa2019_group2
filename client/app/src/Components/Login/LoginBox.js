import React, { Component } from 'react'
import { ActiveButton, NonActiveButton } from '../Button/Button'
import styled from 'styled-components'
import { RegisterInputElement } from '../FormElements/RegisterInputElement'

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

    render() {
        return (
            <LoginForm>
                <h1>เข้าสู่ระบบ</h1>
                <RegisterInputElement width="100">
                    <label>อีเมล์ </label>
                    <input type="text" name="lastname" required />
                </RegisterInputElement>
                <RegisterInputElement width="100">
                    <label>รหัสผ่าน </label>
                    <input type="text" name="lastname" required />
                </RegisterInputElement>
                <NonActiveButton width="100" style={{marginBottom:15}}>เข้าสู่ระบบ</NonActiveButton>
                <ActiveButton width="100">สมัครสมาชิก</ActiveButton>
            </LoginForm>
        )
    }
}

