import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

const TutorProfileArea = (props) => {
  return (
    <div>
        <h1>อาจารย์ {props.profileInfor.nickname}</h1>
        <Avatar size="150" src={props.profileInfor.image} round={true}/>

        <h3>Email</h3> 
        
        {props.profileInfor.emailAddress}

        <h3>ประวัติการศึกษา</h3>
        <div>
            <div><b>มัธยมปลาย: {props.profileInfor.majorInHighSchool}</b></div>
            <div>{props.profileInfor.highSchool}</div>
        </div>
        <div>
            <div><b>ปริญญาตรี: {props.profileInfor.majorInBachelor}</b></div>
            <div>{props.profileInfor.bachelor}</div>
        </div>
        <div>
            <div><b>ปริญญาโท: {props.profileInfor.majorInMaster}</b></div>
            <div>{props.profileInfor.master}</div>
        </div>
        <div>
            <div><b>ปริญญาเอก: {props.profileInfor.majorInDoctoral}</b></div>
            <div>{props.profileInfor.doctoral}</div>
        </div>
    </div>
  )
};

TutorProfileArea.propTypes = {
  profileInfor: PropTypes.shape.isRequired
};

export default TutorProfileArea;