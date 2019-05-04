import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import RegisterForTutor from './registerForTutor';

class Login extends Component {

    state = {
      redirect: false
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/register/' />
      }
    }

    render() {
      return (
        <div className="Login">
          <header className="Login-header">
              <h1>Tutor Finder</h1>
              <form>
                  <label for="email"><b>Email</b></label>
                  <input type="text" placeholder="Enter Email" name="email" required/><br />
  
                  <label for="psw"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" required/><br />
  
                  <button type="submit" class="registerbtn">Login</button>
              </form>
              <div>
                {this.renderRedirect()}
                <button onClick={this.setRedirect}>Register</button>
              </div>
          </header>
        </div>
      );
    }
  }

  export default Login;
