import React, { Component } from 'react';
import TutorProfileArea from './tutorProfileArea';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import PostHistory from './postHistory';
import Comments from './comments';
import { getProfile } from './Actions/profileActions'

class TutorProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    var userId = '5cb8c32590a45d6a02862a30';
    var profile = getProfile(userId);
    profile.then(result => {
      console.log(result.profile)
      this.setState({
        data: result.profile,
      })
    })
  }

    render() {
      const { data } = this.state
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