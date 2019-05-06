import React, { Component } from 'react';
import RegisterForStudent from './registerForStudent';
import RegisterForTutor from './registerForTutor';
import {Link, Route, BrowserRouter} from 'react-router-dom';

class Register extends Component {
    render() {
      return (
        <div className="Register">
          <header className="Register-header">
              <h1>สมัครสมาชิก</h1>
              <BrowserRouter>
                    <Link to="/register/student/">นักเรียน</Link><br/>
                    <Link to="/register/tutor/" data-cy="tutorForm">ติวเตอร์</Link>
                    <Route path="/register/student/" component={RegisterForStudent} />
                    <Route path="/register/tutor/" component={RegisterForTutor} />
              </BrowserRouter>
          </header>
        </div>
      );
    }
  }

  export default Register;