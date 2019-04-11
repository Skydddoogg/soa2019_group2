import React, { Component } from 'react';
import TutorProfileArea from './tutorProfileArea';
import TutorProfilePhoto from './tutorProfilePhoto';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import PostHistory from './postHistory';
import Comments from './comments';

class TutorProfile extends Component {

    render() {
      return (
        <div className="TutorProfile">
          <header className="TutorProfile-header">
            <TutorProfilePhoto image='https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' />
            <TutorProfileArea
                username="เมเม่"
                emailAddress="meme@whatever.com"
                highSchool="โรงเรียนเลิงนกทา"
                bachelor="Carnegie Mellon University"
                master="University of California, Berkeley"
                doctoral="University of California, Berkeley"
                majorInHighSchool="Science-Math"
                majorInBachelor="Computer Science"
                majorInMaster="Statistics"
                majorInDoctoral="Research Operations"
            />
              <BrowserRouter>
                    <div><Link to="/tutor-profile/post-history/">ประวัติการประกาศ</Link></div>
                    <div><Link to="/tutor-profile/comments/">Comments</Link></div>
                    <Route path="/tutor-profile/post-history/" component={PostHistory} />
                    <Route path="/tutor-profile/comments/" component={Comments} />
              </BrowserRouter>
          </header>
        </div>
      );
    }
  }

  export default TutorProfile;