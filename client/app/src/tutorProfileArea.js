import React from 'react';
import PropTypes from 'prop-types';

const TutorProfileArea = (props) => {
  return (
    <div>
        <h1>อาจารย์ {props.username}</h1>

        <h3>Email</h3> 
        
        {props.emailAddress}

        <h3>ประวัติการศึกษา</h3>
        <div>
            <div><b>มัธยมปลาย: {props.majorInHighSchool}</b></div>
            <div>{props.highSchool}</div>
        </div>
        <div>
            <div><b>ปริญญาตรี: {props.majorInBachelor}</b></div>
            <div>{props.bachelor}</div>
        </div>
        <div>
            <div><b>ปริญญาโท: {props.majorInMaster}</b></div>
            <div>{props.master}</div>
        </div>
        <div>
            <div><b>ปริญญาเอก: {props.majorInDoctoral}</b></div>
            <div>{props.doctoral}</div>
        </div>
    </div>
  )
};

TutorProfileArea.propTypes = {
  username: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  highSchool: PropTypes.string.isRequired,
  majorInBachelor: PropTypes.string.isRequired,
  majorInMaster: PropTypes.string.isRequired,
  majorInDoctoral: PropTypes.string.isRequired,
  majorInHighSchool: PropTypes.string.isRequired,
  bachelor: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
  doctoral: PropTypes.string.isRequired
};

export default TutorProfileArea;