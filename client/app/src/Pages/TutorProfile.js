import React, { Component } from 'react';
import TutorProfileArea from '../tutorProfileArea';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import PostHistory from '../postHistory';
import Comments from '../Components/Profile/comments';
import { getProfile } from '../Actions/profileActions'
import axios from 'axios';
import { stat } from 'fs';
import Wrapper from '../Components/Wrapper'
import styled from 'styled-components'


const WrapperComment = styled.div`
  display:flex;
  width:80%;
  margin:auto;    
  justify-content: space-around;
  flex-direction:column;
  & h3{
    width:100%;
    text-align:left;
    color:#008FF6;
  }
  
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

class TutorProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      activeButton: false,
      targetId:localStorage.getItem('userId')
    }
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState({
        targetId:this.props.location.state.tutorId
      })
    }
    var profile = getProfile(this.state.targetId);
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

            <WrapperComment >
              <h3>Comments</h3>

              <Comments targetId={this.state.targetId} />
            </WrapperComment>

          </header>
        </Wrapper>
      </div>
    );
  }
}

export default TutorProfile;