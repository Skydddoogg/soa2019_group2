import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Register from './Pages/Register'
import Home from './Pages/Home'
import TutorProfile from './Pages/TutorProfile'
import Search from './Pages/Search';
import Offer from './Pages/Offer'
import Post from './Pages/Post'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Register} />
        <Route path="/post" component={Post} />
        <Route path="/offer" component={Offer} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={TutorProfile} />
      </div>
    )
  }
}

export default App