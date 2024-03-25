import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = ({ description, reviewsCount, details, onSeeDetailsClick }) => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className={`descriptionbox-nav-box ${!details ? 'descriptionbox-nav-box-selected' : ''}`}>Description</div>
        <div className={`descriptionbox-nav-box fade ${details ? 'descriptionbox-nav-box-selected' : ''}`}>Reviews ({reviewsCount})</div>
      </div>
      <div className="descriptionbox-description">
        {
          description ? (
            <p>{description}</p>
          ) : (
            <p className="descriptionbox-description-empty">No description provided.</p>
          )
        }
      </div>
      {
        details && (
          <button className="descriptionbox-details-button" onClick={onSeeDetailsClick}>See details</button>
        )
      }
    </div>
  )
}

export default DescriptionBox


import React from 'react'
import DescriptionBox from './DescriptionBox'

const App = () => {
  const [showDetails, setShowDetails] = React.useState(false)

  const handleSeeDetailsClick = () => {
    set
