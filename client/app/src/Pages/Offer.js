import React, { Component } from 'react';
import styled from 'styled-components'
import Wrapper from '../Components/Wrapper'
import { ActiveButton, NonActiveRemoveButton } from '../Components/Button/Button'
import {getStudentOffer} from '../Actions/offerAction'
import {Link} from 'react-router-dom'
var offerInbox = [
  {
    postId: '5c99b60908aa5a2eb7c2f196',
    tutorId: '5cd0c3d8c21000008525ce1b',
    tutorUsername: 'nishino_nanase'
  },
  {
    postId: '5c99b60908aa5a2eb7c2f196',
    tutorId: '5cd0c3d8c21000008525ce1b',
    tutorUsername: 'ikuta_erika'
  }
]

const OfferTitle = styled.h1`
font-size:2.5em;
color:#008FF6;
font-family:prompt;
text-align:center;
`

const OfferTable = styled.table`
width:100%;
border-collapse: collapse;
text-align:center;
font-family:Bai Jamjuree;
border: 1px solid #E8EEF2;
  & tr{
    border-bottom: 1px solid #E8EEF2;
  }
  & th{
    color:#008FF6;
    font-weight:bold;
  }
  & td, th{
    padding:1%;
  }

  & tbody > tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
`

const ButtonWrapper = styled.div`
width:100%;
margin:auto;
display:flex;
justify-content:center;
  & > div{
    width:30%;
  }

  & > div:nth-child(1){
    margin-right:0.5%;
  }

  & > div:nth-child(2){
    margin-left:0.5%;
  }
`


const Status = styled.div`
`

class Offers extends Component {
  componentDidMount() {
    getStudentOffer(localStorage.getItem('userId'));
  }

  constructor(props){
    super(props)

  }
  render() {
    return (
      <div className="Offers">
        <header className="Offers-header">
          <Wrapper>
            <OfferTitle>ข้อเสนอจากอาจารย์</OfferTitle>
            <OfferTable>
              <thead>
                <tr>
                  <th>AA</th>
                  <th>BB</th>
                  <th>CC</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {offerInbox.map(function (c, i) {
                  return <tr key={i}>
                    <td>{c.postId}</td>
                    <td>{c.tutorId}</td>
                    <td>{c.tutorUsername}</td>
                    <td>
                      <ButtonWrapper>
                        
                        <Link to={{pathname: '/profile',
  state: {
    tutorId: c.tutorId
  }
}}><ActiveButton width="80">ดูข้อมูล</ActiveButton></Link>
                      </ButtonWrapper>
                    </td>
                  </tr>

                })}
              </tbody>
            </OfferTable>
          </Wrapper>
        </header>
      </div>
    );
  }
}

export default Offers;