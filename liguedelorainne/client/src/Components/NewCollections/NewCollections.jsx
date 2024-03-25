import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr key="line" />
      <div className="collections">
        {props.data.map((item,i)=>{
                const { id, name, image, new_price = 0, old_price = 0 } = item;
                return <Item id={id} key={i} name={name} image={image || "default-image.jpg"} new_price={new_price} old_price={old_price} />
            })}
      </div>
    </div>
  )
}

export default NewCollections

