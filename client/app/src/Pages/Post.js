  import React, { Component } from 'react';
import FormForFindingTutor from '../Components/Post/formFindingTutor';
import Wrapper from '../Components/Wrapper'
import styled from 'styled-components'

const PostLayout = styled.div`
  & h1{
    text-align:center;
    font-family:Prompt;
    color:#008FF6;
    font-size:2.8em;
  }
`
class Post extends Component {
    render() {
      return (
        <div className="Post">
        <Wrapper>
          <header className="Post-header">
            <PostLayout>
                <h1>ลงประกาศหาติวเตอร์</h1>
                <FormForFindingTutor />
            </PostLayout>
          </header>
          </Wrapper>
        </div>
      );
    }
  }

  export default Post;