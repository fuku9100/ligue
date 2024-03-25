import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import data_product from '../Assets/data'

const RelatedProducts = () => {
  const relatedProducts = data_product.map(({ id, name, image, new_price, old_price, stock }) => {
    const price = old_price ? `$${old_price} $${new_price}` : `$${new_price}`;
    return <Item key={id} id={item.id} name={item.name} image={item.image} price={price} stock={item.stock} />
  });

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts}
      </div>
    </div>
  )
}

export default RelatedProducts
