import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating.js';


export default function Product(props) {
    const { product } = props;
    return(
        <div key={product._id} className="card primary">
            <Link to={`/product/${product._id}`}>
                <img className="medium" 
                src={product.images}
                alt={product.name} 
                />
            </Link>
            <div className="card-body primary">
                <Link to={'/product/${product._id}'}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                <div className="row">
                    <div className="price">${product.price}</div>
                    <div>
                        <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
