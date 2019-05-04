import styled from 'styled-components'
import React , {Component} from 'react'


export const ActiveButton = styled.button`
width:${props => props.width}%;
height:45px;
color:#fff;
font-size:1.1em;
padding:0 20px 0 20px;
background-color:#008FF6;
font-family:'Prompt', sans-serif;
border-radius:3px;
border:none;
margin:auto;
cursor:pointer;
transition:all .2s ease;
&:hover{
    background-color:#006dbf;
}
`

export const NonActiveButton = styled.button`
width:${props => props.width}%;
height:45px;
color:#008FF6;
font-size:1.1em;
padding:0 20px 0 20px;
background:none;
font-family:'Prompt', sans-serif;
border-radius:3px;
border:1px solid #008FF6;
margin:auto;
cursor:pointer;
transition:all .2s ease;
&:hover{
    color:#fff;
    background-color:#006dbf;
}
`
