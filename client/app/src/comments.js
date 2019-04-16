import React, { Component } from 'react';
import Avatar from 'react-avatar';

var commentData = [
  { 
    author:"Shawn Spencer", 
    text:"I've heard it both ways",
    imgUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
  },
  { 
    author:"Burton Guster", 
    text:"You hear about Pluto? That's messed up",
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

    // TODO: Get username
    var authorVal = "Sky"

    var textVal = e.target[0].value.trim();

    // TODO: Get image URL
    var imgVal = "https://cdn.guidingtech.com/media/assets/WordPress-Import/2012/10/Smiley-Thumbnail.png"
    
    if (!textVal || !authorVal || !imgVal) {
      return;
    }
    
    this.props.onCommentSubmit({author: authorVal, text: textVal, imgUrl: imgVal});
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
        <div><Avatar size="100" src={this.props.imgUrl}/> <b>{this.props.author}</b></div>
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