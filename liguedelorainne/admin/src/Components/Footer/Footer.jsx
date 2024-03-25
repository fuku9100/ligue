import React from 'react'
import './Footer.css'
import ContactLink from './ContactLink' // assuming this component exists

const Footer = () => {
  return (
    <div className='footer'>
      <hr />
      <p>
        Copyright © {new Date().getFullYear()} - All Rights Reserved.
        <ContactLink /> {/* assuming this component displays a link to the contact page */}
      </p>
    </div>
  )
}

export default Footer
