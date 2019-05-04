import React, { Component } from 'react';
import RegisterFormForStudent from './Forms/registerFormForStudent';

class RegisterForStudent extends Component {
    render() {
      return (
        <div className="RegisterForStudent">
          <header className="RegisterForStudent-header">
              <h1>สมัครสมาชิกสำหรับ นักเรียน</h1>
              <RegisterFormForStudent />
          </header>
        </div>
      );
    }
  }

  export default RegisterForStudent;