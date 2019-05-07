import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import styled from 'styled-components'
const WrapperProfile = styled.div`
width:80%;
margin:auto;
& h1 , h2 ,h3 ,h4{
  font-family:prompt;
}
& > h1{
  color:#008FF6;
  text-align:center;
  font-size:2.5em;
}
`
const Table = styled.table`
width:100%;
border-collapse: collapse;

font-family:Bai Jamjuree;
border: 1px solid #E8EEF2;
  & tr{
    width:100%;
    border-bottom: 1px solid #E8EEF2;
  }
  & th{
    color:#008FF6;
    font-weight:bold;
    text-align:center;
  }
  & td, th{
    padding:1%;
  }

  & tbody > tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
`
const TutorProfileArea = (props) => {
  return (
    <WrapperProfile>
      <h1>โปรไฟล์</h1>
      <h2>อาจารย์ {props.profileInfor.firstname} {props.profileInfor.lastname}</h2>

      <h3>Email : {props.profileInfor.email}</h3>


      <Table>
        <thead><tr><th>ประวัติการศึกษา</th></tr></thead>
        <tbody>
          <tr>
            <td><b>มัธยมปลาย :</b> {props.profileInfor.highSchool} <b>สาขา :</b> {props.profileInfor.majorInHighSchool}</td>
          </tr>

          <tr>
            <td><b>ปริญญาตรี :</b> {props.profileInfor.bachelor} <b>สาขา :</b> {props.profileInfor.majorInBachelor}</td>
          </tr>

          <tr>
            <td><b>ปริญญาโท :</b> {props.profileInfor.master} <b>สาขา :</b> {props.profileInfor.majorInMaster}</td>
          </tr>


          <tr>
            <td><b>ปริญญาเอก :</b> {props.profileInfor.doctoral} <b>สาขา :</b> {props.profileInfor.majorInDoctoral}</td>
          </tr>
        </tbody>
      </Table>
    </WrapperProfile >
  )
};

TutorProfileArea.propTypes = {
  profileInfor: PropTypes.object.isRequired
};

export default TutorProfileArea;