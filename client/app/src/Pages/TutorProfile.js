import React, { Component } from 'react';
import TutorProfileArea from '../tutorProfileArea';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import PostHistory from '../postHistory';
import Comments from '../Components/Profile/comments';
import { getProfile } from '../Actions/profileActions'
import axios from 'axios';
import { stat } from 'fs';
import Wrapper from '../Components/Wrapper'
import styled from 'styled-components'


const ToggleButtonWrapper = styled.div`
  display:flex;
  width:40%;
  margin:auto;    
  justify-content: space-around;
  
`

const TonggleButton = styled.div`
  & > a{
  font-family:prompt;
  font-size:1.5em;
  font-weight:bold;
  padding-bottom:10px;
  ${props => props.active ? 'color:#008FF6' : 'color:#7A90A8'}
  ${props => props.active ? 'border-bottom:2px solid #008FF6;' : ''}
    &:hover{
      color:#008FF6;
    }
  }
`

const Tester = () =>{
  console.log()
}


class TutorProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      activeButton:false,
    }
  }

  componentDidMount() {
    const { tutorId } = this.props.location.state
    //Check user logged in are tutor or studen
    var userId = localStorage.getItem('userId');
    var profile = getProfile(userId);
    console.log(profile)
    profile.then(result => {
      this.setState({
        data: result.profile,
      })
    })
  }

  
    render() {
      
      const { data } = this.state
      return (
        <div className="TutorProfile">
        <Wrapper>
          
          <header className="TutorProfile-header">
            <TutorProfileArea
                profileInfor={data}
            />
              <BrowserRouter>
                    <ToggleButtonWrapper >
                    <TonggleButton active={!this.state.activeButton} onClick={Tester}><Link  to="/tutor-profile/post-history/" >ประวัติการประกาศ</Link></TonggleButton>
                    <TonggleButton active={this.state.activeButton} onClick={Tester}><Link to="/tutor-profile/comments/" >Comments</Link></TonggleButton>
                    </ToggleButtonWrapper>
                    <Route path="/tutor-profile/post-history/" component={PostHistory} />
                    <Route path="/tutor-profile/comments/" component={Comments} />
              </BrowserRouter>
          </header>
          </Wrapper>
        </div>
      );
    }
  }

  export default TutorProfile;