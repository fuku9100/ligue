import React, { useState } from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    // handle form submission here
  }

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Your email id:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
