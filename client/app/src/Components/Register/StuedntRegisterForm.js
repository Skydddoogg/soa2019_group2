import React, { Component } from 'react'
import { TwoColumnRegisterInputElement, RegisterInputElement, PasswordValidationElement, PasswordStatus, ConfirmationAlert } from '../FormElements/RegisterInputElement'
import { ActiveButton } from '../Button/Button'
import { createUser } from '../../Actions/registerActions'
import { Redirect, Link } from 'react-router-dom'
class StuedntRegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmPasswordStatus: false,
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            userType: 'student',
            passwordValue: "",
            confirmPasswordValue: "",
            lowerCaseStatus: false,
            upperCaseStatus: false,
            numberCaseStatus: false,
            lengthOfPasswordState: false,
            confirmPasswordStatus: false,
            validationPasswordStatus: false,
            duplicationStatus: false,
            duplicationDialog:false
        }
    }


    handlePasswordValidation = (pass) => {
        this.setState({
            passwordValue: pass.target.value
        })
        var pass = pass.target.value;
        var lowerCase = /^(?=.*?[a-z])/;
        var uperCase = /^(?=.*?[A-Z])/;
        var numberCase = /^(?=.*?[0-9])/;
        if (lowerCase.test(pass)) {
            this.setState({ lowerCaseStatus: true });
        } else {
            this.setState({ lowerCaseStatus: false });
        }

        if (uperCase.test(pass)) {
            this.setState({ upperCaseStatus: true });
        } else {
            this.setState({ upperCaseStatus: false });
        }

        if (numberCase.test(pass)) {
            this.setState({ numberCaseStatus: true });
        } else {
            this.setState({ numberCaseStatus: false });
        }

        if (pass.length >= 8) {
            this.setState({ lengthOfPasswordState: true });
        } else {
            this.setState({ lengthOfPasswordState: false });
        }
    }

    handleConfirmPassword = (e) => {
        this.setState({
            confirmPasswordValue: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleFirstname = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }

    handleLastName = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    handlePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.lowerCaseStatus &&
            this.state.upperCaseStatus &&
            this.state.numberCaseStatus &&
            this.state.lengthOfPasswordState
        ) {
            this.setState({
                validationPasswordStatus: false
            })
            if (this.state.confirmPasswordValue === this.state.passwordValue) {
                this.setState({
                    confirmPasswordStatus: false
                })

                //call api here
                const data = {
                    'username': this.state.username,
                    'password': this.state.passwordValue,
                    'firstname': this.state.firstname,
                    'lastname': this.state.lastname,
                    'email': this.state.email,
                    'userType': this.state.userType,
                    'phoneNumber': this.state.phoneNumber

                };
                createUser(data).then(res =>{
                    if (res == 500) {
                        this.setState({
                            duplicationStatus: false,
                            duplicationDialog: true
                        })
                        window.scrollTo(0, 0);
                    } else {
                        this.setState({
                            duplicationStatus: true
                        })
                    }
                })

            } else {
                this.setState({
                    confirmPasswordStatus: true
                })
            }
        } else {
            this.setState({
                validationPasswordStatus: true
            })
        }
    }

    render() {
        if (this.state.duplicationStatus) {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <form action="/" method="POST" onSubmit={this.handleSubmit} >
                    <RegisterInputElement marginBottom={5}>
                        <ConfirmationAlert show={this.state.duplicationDialog} marginBottom="3">
                            <span>ชื่อผู้ใช้ มีอยู่ในระบบแล้ว</span>
                        </ConfirmationAlert>
                        <label>ชื่อผู้ใช้ </label>
                        <input type="text" onChange={this.handleUsername} value={this.state.username} name="username" required />
                    </RegisterInputElement>
                    <RegisterInputElement marginBottom={5}>
                        <label>อีเมล์ </label>
                        <input type="email" onChange={this.handleEmail} value={this.state.email} name="email" required />
                    </RegisterInputElement>


                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>ชื่อ</label>
                            <input type="text" name="firstname" onChange={this.handleFirstname} value={this.state.firstname} required />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>นามสกุล </label>
                            <input type="text" name="lastname" onChange={this.handleLastName} value={this.state.lastname} required />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>


                    <RegisterInputElement marginBottom={5}>
                        <label>เบอร์โทรศัพท์ </label>
                        <input type="text" name="telephone" onChange={this.handlePhoneNumber} value={this.state.phoneNumber} required />
                    </RegisterInputElement>


                    <RegisterInputElement marginBottom={5}>
                        <label>รหัสผ่าน</label>
                        <input type="password" onChange={this.handlePasswordValidation} value={this.state.passwordValue} required />
                        <ConfirmationAlert show={this.state.validationPasswordStatus}>
                            <span>รหัสผ่านไม่ถูกต้อง</span>
                        </ConfirmationAlert>
                    </RegisterInputElement>

                    <PasswordValidationElement >
                        <div>
                            <PasswordStatus show={this.state.lowerCaseStatus} ></PasswordStatus>
                            <span>ตัวอักษรพิมพ์เล็ก (a-z)</span>
                        </div>

                        <div>
                            <PasswordStatus show={this.state.upperCaseStatus} ></PasswordStatus>
                            <span>ตัวอักษรพิมพ์ใหญ่ (A-Z)</span>
                        </div>

                        <div>
                            <PasswordStatus show={this.state.numberCaseStatus} ></PasswordStatus>
                            <span>อย่างน้อยหนึ่งตัวเลข (0-9)</span>
                        </div>

                        <div>
                            <PasswordStatus show={this.state.lengthOfPasswordState} ></PasswordStatus>
                            <span>อย่างน้อย 8 ตัวอักษร</span>
                        </div>
                    </PasswordValidationElement>

                    <RegisterInputElement marginBottom={5}>
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" name="re_password" onChange={this.handleConfirmPassword} value={this.state.confirmPasswordValue} required />
                        <ConfirmationAlert show={this.state.confirmPasswordStatus}>
                            <span>รหัสผ่านไม่ตรงกัน</span>
                        </ConfirmationAlert>
                    </RegisterInputElement>



                    <RegisterInputElement>
                        <ActiveButton type="submit" width="30">สมัครสมาชิก</ActiveButton>
                    </RegisterInputElement>
                </form>
            </div>
        )
    }
}

export default StuedntRegisterForm;