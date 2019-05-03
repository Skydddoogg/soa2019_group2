import React, { Component } from 'react';
import Navbar from '../Components/Navbar'
import styled from 'styled-components'
import bg_pattern from '../Assets/images/home_bg_pattern.svg'
import Wrapper from '../Components/Wrapper'
import LoginBox from '../Components/Login/LoginBox'
var HomeSection = styled.section`
background-color:#008FF6;
width:100%;
height:100vh;
margin:0;
background-repeat: repeat;
float:left;

background-image:url(${bg_pattern});
`

var InsideHomeSection = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
padding-top:10%;
padding-bottom:10%;
`


var LeftContent = styled.div`

width:50%;
  & > h2{
    color:#fff;
    font-size:4.1em;
    font-family:prompt;
    padding:0;
    margin:0;
    font-weight:600;
  }

  & > p{
    font-size:1.8em;
    color:#fff;
    font-family: Bai Jamjuree;
    padding:0;
    margin: 0;
    line-height: 30px;
    opacity:0.9;
  }
`
var RightContent = styled.div`
width:40%;
`
class Home extends Component {
  render() {
    return (
      <div>
        
        <HomeSection>
        <Navbar />
          <Wrapper>
            <InsideHomeSection className="animated bounceInUp">
              <LeftContent>
                <h2>
                  ชำนาญในการสอน,<br />
                  ช่ำชองในการเรียน
            </h2>
                <p>
                  โฮปเอ็นเตอร์เทนอ่อนด้อยเพลย์บอยบุ๋น บ๋อยพลาซ่าเซอร์ไพรส์สเตชัน โชว์รูมสไตรค์พรีเซ็นเตอร์ ดั๊มพ์ พฤหัสแอดมิสชันจังโก้พ่อค้าชะโนด ออทิสติกวาริชศาสตร์คลิป ผลไม้ป๋าโพสต์ไมเกรนเคลื่อนย้าย ซิตีดีพาร์ทเมนท์มลภาวะ ดีไซน์เนอร์ไทเฮา
            </p>
              </LeftContent>
              <RightContent>
                <LoginBox />
              </RightContent>
            </InsideHomeSection>
          </Wrapper>
        </HomeSection>
      </div>
    );
  }
}

export default Home;
