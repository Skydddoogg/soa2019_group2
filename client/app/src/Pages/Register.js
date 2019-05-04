import React, { Component } from 'react';
import Navbar from '../Components/Navbar'
import Wrapper from '../Components/Wrapper'
import styled from 'styled-components'
import StuedntRegisterForm from '../Components/Register/StuedntRegisterForm'
import TutorRegisterForm from '../Components/Register/TutorRegisterForm'
var FormWrapper = styled.div`
display:flex;
width:50%;
margin:auto;
padding-top:2%;
`
var StudentTab = styled.div`
width:100%;
display:${props => props.toggle ? 'block' : 'none'};
transition:all .2s ease;
`

var TutorForm = styled.div`
width:100%;
display:${props => props.toggle ? 'block' : 'none'};
transition:all .2s ease;
`

var FormElement = styled.div`
display:flex;
flex-direction:column;
margin-bottom:5%;
  & > label{
    font-size:14px;
    margin-bottom:1%;
    font-family:'Prompt', sans-serif;
  }

  & > input{
    width:100%;
    height:20px;
    padding:10px;
    &::placeholder{
      color:#ccc;
    }
    background-color:#fff;
    border:1px solid #E8EEF2;
  }
`

var Title = styled.h2`
color:#008FF6;
text-align:center;
font-size:2.3em;
font-family:'Prompt', sans-serif;
`

var ToggleButtonWrapper = styled.div`
  display:flex;
  margin:auto;
  width:auto;
  margin-top:3  0px;
  justify-content:center;
`
var ToggleButton = styled.button`
width:146px;
height:45px;
color:${props => props.toggle ? '#FFF' : '#000'};
font-size:1.1em;
padding:0 20px 0 20px;
background-color:${props => props.toggle ? '#008FF6' : '#008FF600'};
font-family:'Prompt', sans-serif;
border-radius:3px;
border:none;
transition:all .3s ease;
cursor:pointer;
`





class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleButtonFlag: false,
    }
  }
  handleClick = (e) => {
    this.setState(prevState => ({
      toggleButtonFlag: !prevState.toggleButtonFlag
    }));
  }


  render() {

    return (
      <div>
        <Navbar />

        <Wrapper>

          <Title>สมัครสมาชิก</Title>
          <ToggleButtonWrapper>
            <ToggleButton toggle={!this.state.toggleButtonFlag} onClick={this.handleClick}>นักเรียน</ToggleButton>
            <ToggleButton toggle={this.state.toggleButtonFlag} onClick={this.handleClick}>ติวเตอร์</ToggleButton>
          </ToggleButtonWrapper>
          <FormWrapper>
            <StudentTab toggle={!this.state.toggleButtonFlag} className="animated bounceInUp" onSubmit={this.handleSubmit}>
              <StuedntRegisterForm />
            </StudentTab>
            <TutorForm toggle={this.state.toggleButtonFlag} className="animated bounceInUp">
              <TutorRegisterForm />
            </TutorForm>


          </FormWrapper>
        </Wrapper>
      </div>
    );
  }
}

export default Register;