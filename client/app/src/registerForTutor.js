import React, { Component } from 'react';

class RegisterForTutor extends Component {
  render() {
    return (
      <div className="RegisterForTutor">
        <header className="RegisterForTutor-header">
            <h1>สมัครสมาชิกสำหรับ ติวเตอร์</h1>
            <form>
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required/><br />

                <label for="firstname"><b>First Name</b></label>
                <input type="text" placeholder="Enter First Name" name="firstname" required/>

                <label for="lastname"><b>Last Name</b></label>
                <input type="text" placeholder="Enter Last Name" name="lastname" required/><br />

                <b>ระดับการศึกษา</b><br />

                <label for="highSchool">มัธยมปลาย</label>
                <input type="text" placeholder="Enter High School" name="highSchool" required/><br />

                <label for="highSchool">ปริญญาตรี</label>
                <input type="text" placeholder="Enter Bachelor's Degree" name="highSchool" required/><br />

                <label for="highSchool">ปริญญาโท</label>
                <input type="text" placeholder="Enter Master Degree" name="highSchool" required/><br />

                <label for="highSchool">ปริญญาเอก</label>
                <input type="text" placeholder="Enter Doctoral Degree" name="highSchool" required/><br />

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required/>

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" required/><br />

                <button type="submit" class="registerbtn">Register</button>
            </form>
        </header>
      </div>
    );
  }
}

export default RegisterForTutor;
