import React, { Component } from 'react';
import FormForFindingTutor from './forms/formFindingTutor';

class Post extends Component {
    render() {
      return (
        <div className="Post">
          <header className="Post-header">
            <div>
                <h1>ลงประกาศหาติวเตอร์</h1>
                <FormForFindingTutor />
            </div>
          </header>
        </div>
      );
    }
  }

  export default Post;