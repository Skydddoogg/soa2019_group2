import React, { Component } from 'react';

class Login extends Component {
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
          </header>
        </div>
      );
    }
  }

  export default Login;