import React from 'react'
import './Sidebar.css'
import add_product_icon from '../Assets/Product_Cart.svg'
import list_product_icon from '../Assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-container">
        <Link
          to={'/addproduct'}
          style={{ textDecoration: 'none' }}
          activeClassName="active"
          key={'add-product'}
        >
          <div className="sidebar-item">
            <img src={add_product_icon} alt="Add Product" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link
          to={'/listproduct'}
          style={{ textDecoration: 'none' }}
          activeClassName="active"
          key={'product-list'}
        >
          <div className="sidebar-item">
            <img src={list_product_icon} alt="Product List" />
            <p>Product List</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar


.sidebar .sidebar-container .active {
  background-color: #f5f5f5;
}
