import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className='breadcrums'>
      <span title='Home page'>
        <img src={arrow_icon} alt="Home icon" /> HOME
      </span>
      <img src={arrow_icon} alt="Arrow icon" />
      <span title='Shop page'>
        <img src={arrow_icon} alt="Shop icon" /> SHOP
      </span>
      <img src={arrow_icon} alt="Arrow icon" />
      <span title={`${product.category} page`}>
        {product.category}
      </span>
      <img src={arrow_icon} alt="Arrow icon" />
      <span title={`${product.name} page`}>
        {product.name}
      </span>
    </div>
  )
}

export default Breadcrums
