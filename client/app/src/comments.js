import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { createComment } from './actions/reviewActions';

var commentData = [
  { 
    author:"Pleng Pongpanot", 
    text:"อาจารย์สอนไม่ช้าและไม่เร็วเกินไป สุดยอดครับ แต่อยากให้อาจารย์หาโจทย์มาให้ทำเยอะ ๆ กว่านี้",
    imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  },
  { 
    author:"Bank Mawin", 
    text:"สุดยอดอาจารย์สอนคณิตศาสตร์เลย",
    imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  }
];

class CommentBox extends Component {

  getInitialState() {
    return {
      data: commentData
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
        {this.props.data.map(function(c){
          return (
            <Comment author={c.author} text={c.text} imgUrl={c.imgUrl}/>
          );
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

    // Send data to API
    createComment(data);
    
    this.props.onCommentSubmit({author: authorVal, text: textVal, imgUrl: authorImgVal});
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
        <div><Avatar size="60" src={this.props.imgUrl} round={true}/> <b>{this.props.author}</b></div>
        {this.props.text}
      </div>
    );
  }
}

class Comments extends Component {
    render() {
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