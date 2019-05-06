import React, { Component } from 'react'
import { TwoColumnRegisterInputElement, RegisterInputElement, PasswordValidationElement, PasswordStatus, ConfirmationAlert } from '../FormElements/RegisterInputElement'
import { ActiveButton } from '../Button/Button'
import { Redirect } from 'react-router-dom'
import { createUser } from '../../Actions/registerActions'
class TutorRegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmPasswordStatus: false,
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            userType: 'tutor',
            passwordValue: "",
            confirmPasswordValue: "",
            lowerCaseStatus: false,
            upperCaseStatus: false,
            numberCaseStatus: false,
            lengthOfPasswordState: false,
            confirmPasswordStatus: false,
            validationPasswordStatus: false,
            duplicationStatus: false,
            duplicationDialog: false,
            highSchool:" ",
            bachelor:" ",
            master:" ",
            doctoral:" ",
            majorInBachelor:" ",
            majorInMaster:" ",
            majorInDoctoral:" ",
            majorInHighSchool:" ",
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

    handleDegree = (e) => {
        this.setState({
            degree: e.target.value
        })
    }

    handlePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    //Degree

    handleHighSchool = (e) => {
        this.setState({
            highSchool: e.target.value
        })
    }

    handleMajorInHighSchool = (e) => {
        this.setState({
            majorInHighSchool: e.target.value
        })
    }

    handleBachelor = (e) => {
        this.setState({
            bachelor: e.target.value
        })
    }

    handleMajorInBachelor = (e) => {
        this.setState({
            majorInBachelor: e.target.value
        })
    }

    handleMaster = (e) => {
        this.setState({
            master: e.target.value
        })
    }

    handleMajorInMaster = (e) => {
        this.setState({
            majorInMaster: e.target.value
        })
    }

    handleDoctoral = (e) => {
        this.setState({
            doctoral: e.target.value
        })
    }

    handlemMjorInHighSchool = (e) => {
        this.setState({
            majorInDoctoral: e.target.value
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
                    'phoneNumber': this.state.phoneNumber,
                    'highSchool': this.state.highSchool,
                    'bachelor': this.state.bachelor,
                    'master': this.state.master,
                    'doctoral': this.state.doctoral,
                    'majorInBachelor': this.state.majorInBachelor,
                    'majorInMaster': this.state.majorInMaster,
                    'majorInDoctoral': this.state.majorInDoctoral,
                    'majorInHighSchool': this.state.majorInHighSchool
                };
                createUser(data).then(res => {
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
                window.scrollTo(0, 0);
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
                        <input type="text" onChange={this.handleUsername} value={this.state.username} name="username" data-cy="tutorFormUsername" required />
                    </RegisterInputElement>
                    <RegisterInputElement marginBottom={5}>
                        <label>อีเมล์ </label>
                        <input type="email" onChange={this.handleEmail} value={this.state.email} name="email" data-cy="tutorFormEmail" required />
                    </RegisterInputElement>
                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>ชื่อ</label>
                            <input type="text" name="firstname" data-cy="tutorFormFirstname" onChange={this.handleFirstname} value={this.state.firstname} required />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>นามสกุล </label>
                            <input type="text" name="lastname" data-cy="tutorFormLastname" onChange={this.handleLastName} value={this.state.lastname} required />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>

                    <RegisterInputElement marginBottom={5}>
                        <label>เบอร์โทรศัพท์ </label>
                        <input type="text" name="telephone" data-cy="tutorFormTelephone" onChange={this.handlePhoneNumber} value={this.state.phoneNumber} required />
                    </RegisterInputElement>



                    <RegisterInputElement marginBottom={5}>
                        <label>รหัสผ่าน</label>
                        <input type="password" data-cy="tutorFormPassword" onChange={this.handlePasswordValidation} value={this.state.passwordValue} required />
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

                    <RegisterInputElement marginBottom={5}>
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" name="re_password" data-cy="tutorFormRe_password" onChange={this.handleConfirmPassword} value={this.state.confirmPasswordValue} required />
                        <ConfirmationAlert show={this.state.confirmPasswordStatus}>
                            <span>รหัสผ่านไม่ตรงกัน</span>
                        </ConfirmationAlert>
                    </RegisterInputElement>
            
                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>โรงเรียนมัธยมปลาย</label>
                            <input type="text" name="highSchool" data-cy="tutorFormHighschool" onChange={this.handleHighSchool} value={this.state.highSchool} />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>สาขา</label>
                            <input type="text" name="majorInHighSchool" data-cy="tutorFormHighschoolMajor" onChange={this.handleMajorInHighSchool} value={this.state.majorInHighSchool} />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>

                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>สถาบันการศึกษาระดับปริญาตรี</label>
                            <input type="text" name="bachelor" data-cy="tutorFormBachelor" onChange={this.handleBachelor} value={this.state.bachelor} />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>สาขา</label>
                            <input type="text" name="majorInBachelor" data-cy="tutorFormBachelorMajor"onChange={this.handleMajorInBachelor} value={this.state.majorInBachelor} />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>


                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>สถาบันการศึกษาระดับปริญาโท</label>
                            <input type="text" name="master" data-cy="tutorFormMaster" onChange={this.handleMaster} value={this.state.master} />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>สาขา </label>
                            <input type="text" name="majorInMaster" data-cy="tutorFormMasterMajor" onChange={this.handleMajorInMaster} value={this.state.majorInMaster} />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>

                    <TwoColumnRegisterInputElement marginBottom={5}>
                        <RegisterInputElement width="45">
                            <label>สถาบันการศึกษาระดับปริญาเอก</label>
                            <input type="text" name="doctoral"  data-cy="tutorFormDoctor" onChange={this.handleDoctoral} value={this.state.doctoral} />
                        </RegisterInputElement>

                        <RegisterInputElement width="45" >
                            <label>สาขา</label>
                            <input type="text" name="majorInDoctoral" data-cy="tutorFormDoctorMajor" onChange={this.handlemMjorInHighSchool} value={this.state.majorInDoctoral} />
                        </RegisterInputElement>
                    </TwoColumnRegisterInputElement>



                    <RegisterInputElement>
                        <ActiveButton type="submit" data-cy="tutorFormRegister_btn" width="30">สมัครสมาชิก</ActiveButton>
                    </RegisterInputElement>
                </form>
            </div>
        )
    }
}

export default TutorRegisterForm;