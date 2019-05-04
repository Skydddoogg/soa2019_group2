import React , {Compoenent} from 'react'
import styled from 'styled-components'
export const RegisterInputElement = styled.div`
display:flex;
flex-direction:column;
margin-bottom:${props => props.marginBottom}%;
width:${props => props.width}%;
  & > label{
    font-size:14px;
    margin-bottom:1%;
    color:#24292E;
    font-family:'Prompt', sans-serif;
  }

  & > input{
    width:100%;
    height:45px;
    padding:10px;
    font-size:12px;
    font-family:Bai Jamjuree;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &::placeholder{
      color:#ccc;
    }
    background-color:#fff;
    border:1px solid #E8EEF2;
  }

  & > textarea{
    width:100%;
    height:45px;
    padding:10px;
    font-size:12px;
    font-family:Bai Jamjuree;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    &::placeholder{
      color:#ccc;
    }
    background-color:#fff;
    border:1px solid #E8EEF2;
  }

  & > select{
    width:100%;
    height:45px;
    font-size:12px;
    font-family:Bai Jamjuree;
    background-color:#fff;
    border:1px solid #E8EEF2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`

export var TwoColumnRegisterInputElement = styled.div`
display:flex;
width:100%;
margin-bottom:${props => props.marginBottom}%;
  & > div:nth-child(2){
    margin-left:7%;
  }
`


export var PasswordValidationElement = styled.div`
margin-bottom:5%;
  & > div{
    display:flex;
    margin-bottom:10px;
    align-item  :center;
    & > span{
      margin-left:10px; 
      font-size:.9em;
      font-family:"Bai Jamjuree";
      color:#7A90A8;
    }
  }
`

export var PasswordStatus = styled.div`
  width:16px;
  height:16px;
  background-color:#DEECFF;
  border-radius:10000px;
  position:relative;
  &:after {
    content: "";
    width:10px;
    height:10px;
    background-color:#008FF6;
    border-radius:10000px;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    transition:all .3s ease;
    opacity:${props => props.show ? "1" : "0"};
  }
`

export var ConfirmationAlert = styled.div`
  width:100%;
  padding:10px;
  margin-top:3%;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  display:${props => props.show ? "block" : "none"};
`

