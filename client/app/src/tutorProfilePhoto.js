import React from 'react'
import PropTypes from 'prop-types'

const TutorProfilePhoto = (props) => (
  <div className='profile-photo'>
    <img src={props.image} alt='รูปโปรไฟล์' />
  </div>
)

TutorProfilePhoto.propTypes = {
  image: PropTypes.string
}

export default TutorProfilePhoto