import React, { Component } from 'react';

var offerInbox = [
    {
        postId : '5c99b60908aa5a2eb7c2f196',
        tutorId : '5cb365b5fb61c836316035fe',
        tutorUsername : 'nishino_nanase'
    },
    {
        postId : '5c99b60908aa5a2eb7c2f196',
        tutorId : '5cb365b5fb61c836316035fe',
        tutorUsername : 'ikuta_erika'
    }
]

class Offers extends Component {
    render() {
      return (
        <div className="Offers">
          <header className="Offers-header">
              <h1>ข้อเสนอจากอาจารย์</h1>
              <table>
                    <tr>
                        <th>AA</th>
                        <th>BB</th>
                        <th>CC</th>
                    </tr>
                    <OfferList data={offerInbox} />
              </table>
          </header>
        </div>
      );
    }
  }

class OfferList extends Component {
    render() {
        return (
          <div>
            {this.props.data.map(function(c, i){
              return <div key={i}>
                        <Offer postId={c.postId} tutorId={c.tutorId} tutorUsername={c.tutorUsername}/>
                    </div>;
            })}
          </div>
        );
      }
}

class Offer extends Component {
    render() {
      return (
        <tr>
            <td>{this.props.postId}</td>
            <td>{this.props.postId}</td>
            <td>{this.props.postId}</td>
        </tr>
      );
    }
  }

  export default Offers;