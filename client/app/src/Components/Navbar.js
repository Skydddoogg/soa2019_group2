import React, { Component } from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import Button, { ActiveButton } from './Button/Button'
var NavbarOutside = styled.div`
border-bottom:1px solid #E8EEF2;
background-color:#fff;
`


var NavbarWrapper = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
`


var Logo = styled.div`
    font-size:1.9em;
    padding-top:20px;
    padding-bottom:20px;
    font-family:'Prompt', sans-serif;
    font-weight: bold;
    color:#008FF6;
    
    
`

var LeftMenu = styled.div`
    display:flex;
    width:50%;
    align-items: center;
    & > ul{
        display:flex;
    }
    & > ul >li{
            list-style:none;
            margin-right:40px;
    }

    & > ul >li >a{
        color:#7A90A8;
        text-decoration: none;
        font-size:1.1em;
        font-family:'Prompt', sans-serif;
    }
`

var RightMenu = styled.div`
    width:50%;
    display:flex;
    justify-content: flex-end;
    & > ul{
        width:100%;
        padding:0;
        margin:0;
        display:flex;
        align-items: center;
        justify-content: flex-end;
    }

    & > ul > li{
        list-style:none;
        margin-left:35px;
        
    }


    & > ul > li > a{
        color:#7A90A8;
        text-decoration: none;
        font-size:1.1em;
        font-family:'Prompt', sans-serif;
    }
`


class Navbar extends Component {
    render() {
        return (
            <NavbarOutside>
                <Wrapper>
                    <NavbarWrapper>

                        <LeftMenu>
                            <Logo>Tutor Finder</Logo>
                            <ul>
                                <li><a href="#">dd</a></li>
                                <li><a href="#">dd</a></li>
                                <li><a href="#">dd</a></li>
                                <li><a href="#">dd</a></li>
                                <li><a href="#">dd</a></li>
                            </ul>

                        </LeftMenu>
                        <RightMenu>
                            <ul>
                                <li><a href="#">เข้าสู่ระบบ</a></li>
                                <li><a href="#">
                                    <ActiveButton width="146px">สมัครสมาชิก</ActiveButton>
                                </a></li>
                            </ul>
                        </RightMenu>
                    </NavbarWrapper>
                </Wrapper>

            </NavbarOutside>
        )
    }
}

export default Navbar