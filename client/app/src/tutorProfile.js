import React, { Component } from 'react';
import TutorProfileArea from './tutorProfileArea';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import PostHistory from './postHistory';
import Comments from './comments';

// TODO: fetch real data
var data = {
  username: "สกาย",
  emailAddress: "meme@whatever.com",
  highSchool: "โรงเรียนเลิงนกทา",
  bachelor: "Carnegie Mellon University",
  master: "University of California, Berkeley",
  doctoral: "University of California, Berkeley",
  majorInHighSchool: "Science-Math",
  majorInBachelor: "Computer Science",
  majorInMaster: "Statistics",
  majorInDoctoral: "Research Operations",
  image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
}

class TutorProfile extends Component {

    render() {
      return (
        <div className="TutorProfile">
          <header className="TutorProfile-header">
            <TutorProfileArea
                profileInfor={data}
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