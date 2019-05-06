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
                <thead>
                    <tr>
                        <th>AA</th>
                        <th>BB</th>
                        <th>CC</th>
                    </tr>
                </thead>
                {offerInbox.map(function(c, i){
                  return <tbody key={i}>
                    <tr>
                      <td>{c.postId}</td>
                      <td>{c.tutorId}</td>
                      <td>{c.tutorUsername}</td>
                    </tr>
                  </tbody>
                })}
              </table>
          </header>
        </div>
      );
    }
  }

  export default Offers;