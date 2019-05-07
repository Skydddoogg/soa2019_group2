import React, { Component } from 'react'
import { ActiveLink, NonActiveButton } from '../Button/Button'
import styled from 'styled-components'
import { RegisterInputElement, ConfirmationAlert, LoadingAlert } from '../FormElements/RegisterInputElement'
import { handleLogin } from '../../Actions/loginAction'
import { Redirect } from 'react-router-dom'
var LoginForm = styled.form`
width:90%;
margin:auto;
background-color:#fff;
border-radius:10px;
padding:5% 5% 5% 5%;
display: flex;
flex-direction: column;

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

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            valditionDialog: false,
            validationStatus: false,
            timeoutDialog:false,
            loading:false
        }
    }

    handleUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = e => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState({
            loading:true
        })

        handleLogin(data).then(res => {
            if (res == 500) {
                this.setState({
                    validationStatus: false,
                    valditionDialog: true,
                    loading:false
                })
            }else if(res == null){
                this.setState({
                    validationStatus: false,
                    timeoutDialog: true,
                    loading:false,
                })
            } else {
                this.setState({
                    validationStatus: true,
                    valditionDialog: false,
                    loading:false
                })
            }
        })

    }

    render() {
        if (this.state.validationStatus) {
            return <Redirect to='/search' />;
        }
        return (
            <LoginForm onSubmit={this.handleSubmit}>
                <h1>เข้าสู่ระบบ</h1>
                <LoadingAlert show={this.state.loading} marginBottom="3">
                    <span>กำลังเข้าสู่ระบบ...</span>
                </LoadingAlert>
                <ConfirmationAlert show={this.state.valditionDialog} marginBottom="3">
                    <span>ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</span>
                </ConfirmationAlert>
                <ConfirmationAlert show={this.state.timeoutDialog} marginBottom="3">
                    <span>การเชื่อมต่อไม่เสถียร กรุณาลองใหม่อีกครั้ง</span>
                </ConfirmationAlert>
                <RegisterInputElement width="100" marginBottom={5}>
                    <label>ชื่อผู้ใช้ </label>
                    <input type="text" name="username" data-cy="loginUsername" onChange={this.handleUsername} value={this.state.username} />
                </RegisterInputElement>
                <RegisterInputElement width="100" marginBottom={5}>
                    <label>รหัสผ่าน </label>
                    <input type="password" name="password"  data-cy="loginPassword" onChange={this.handlePassword} value={this.state.password} />
                </RegisterInputElement>
                <NonActiveButton width="100" style={{ marginBottom: 15 }}>เข้าสู่ระบบ</NonActiveButton>
                <ActiveLink width="100" href="/signup" >สมัครสมาชิก</ActiveLink>
            </LoginForm>
        )
    }
}

