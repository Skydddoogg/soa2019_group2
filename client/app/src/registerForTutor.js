import React, { Component } from 'react';
import RegisterFormForTutor from './forms/registerFormForTutor';

class RegisterForTutor extends Component {
  render() {
    return (
      <div className="RegisterForTutor">
        <header className="RegisterForTutor-header">
          <h1>สมัครสมาชิกสำหรับ ติวเตอร์</h1>
          <RegisterFormForTutor />
        </header>
      </div>
    );
  }
}

export default RegisterForTutor;
