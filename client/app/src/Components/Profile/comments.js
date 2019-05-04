import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { createComment, getReviews } from '../../Actions/reviewActions';

class CommentBox extends Component {

  getInitialState() {
    return {
      data: this.props.data
    }
  }

  handleCommentSubmit = (comment) => {
    this.props.data.push(comment);
    var comments = this.props.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  }

  render() {
    return (
      <div className="comment-box">
        <CommentForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.props.data} />
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        {this.props.data.map(function(c, i){
          return <div key={i}>
                  <Comment ownerUsername={c.ownerUsername} message={c.message} profileImg={c.profileImg}/>
                </div>;
        })}
      </div>
    );
  }
}

class CommentForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Get author
    var authorVal = "Thanawat Lodkaew"
    var authorIdVal = "1"
    var authorTypeVal = "student"
    var authorImgVal = "https://cdn.guidingtech.com/media/assets/WordPress-Import/2012/10/Smiley-Thumbnail.png"

    // TODO: Get target
    var targetIdVal = "2"
    var targetVal = "Kevin Mawin"
    var targetTypeVal = "tutor"

    var textVal = e.target[0].value.trim();


    if (!textVal || !authorVal || !authorImgVal) {
      return;
    }

    // TODO: Get information
    var data = {
      message: textVal,
      ownerId: authorIdVal,
      targetId: targetIdVal,
      ownerUsername: authorVal,
      targetUsername: targetVal,
      ownerType: authorTypeVal,
      targetType: targetTypeVal,
      profileImg: authorImgVal
    }

    console.log(data)
    // Send data to API
    createComment(data);
    
    this.props.onCommentSubmit({ownerUsername: authorVal, message: textVal, profileImg: authorImgVal});
    e.target[0].value = '';
    e.target[1].value = '';
    return;
  }

  render() {
    return(
      <form className="comment-form form-group" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="Say something..." className="form-control" />
        </div>
        <input type="submit" value="แสดงความคิดเห็น" className="btn btn-primary" />
      </form>
    );
  }
}

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div><Avatar size="60" src={this.props.profileImg} round={true}/> <b>{this.props.ownerUsername}</b></div>
        {this.props.message}
      </div>
    );
  }
}

class Comments extends Component {

    constructor(props) {
      super(props)
      this.state = {
        commentData: []
      }
    }

    componentDidMount() {
      var targetId = '2';
      var reviews = getReviews(targetId)
      reviews.then(result => {
        console.log(result)
        this.setState({
          commentData: result,
        })
      })
    }

    render() {
      const { commentData } = this.state
      return (
        <div className="Comments">
          <header className="Comments-header">
              <h3>ความคิดเห็น</h3>
              <CommentBox data={commentData} />
          </header>
        </div>
      );
    }
  }

export default Comments;