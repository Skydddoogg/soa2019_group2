import React, { Component } from 'react'
import { TwoColumnRegisterInputElement, RegisterInputElement, PasswordValidationElement, PasswordStatus, ConfirmationAlert } from '../FormElements/RegisterInputElement'
import { ActiveButton } from '../Button/Button'
class StuedntRegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmPasswordStatus: false,
            passwordValue: "",
            confirmPasswordValue: "",
            lowerCaseStatus: false,
            upperCaseStatus: false,
            numberCaseStatus: false,
            lengthOfPasswordState: false,
            confirmPasswordStatus: false,
            validationPasswordStatus:false
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

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.lowerCaseStatus &&
            this.state.upperCaseStatus &&
            this.state.numberCaseStatus &&
            this.state.lengthOfPasswordState
        ) {
            this.setState({
                validationPasswordStatus:false
            })
            if (this.state.confirmPasswordValue === this.state.passwordValue) {
                this.setState({
                    confirmPasswordStatus: false
                    //call api here


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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <RegisterInputElement>
                        <label>อีเมล์ </label>
                        <input type="email" name="email" required />
                    </RegisterInputElement>
                    <TwoColumnRegisterInputElement>
                        <RegisterInputElement width="45">
                            <label>ชื่อ</label>
                            <input type="text" name="firstname" required />
                        </RegisterInputElement>

                        <RegisterInputElement width="45">
                            <label>นามสกุล </label>
                            <input type="text" name="lastname" required />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>



                    <RegisterInputElement>
                        <label>รหัสผ่าน</label>
                        <input type="password" onChange={this.handlePasswordValidation} value={this.state.passwordValue} required />
                        <ConfirmationAlert show={this.state.validationPasswordStatus}>
                            <span>รหัสผ่านไม่ถูกต้อง</span>
                        </ConfirmationAlert>
                    </RegisterInputElement>

                    <PasswordValidationElement>
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

                    <RegisterInputElement>
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