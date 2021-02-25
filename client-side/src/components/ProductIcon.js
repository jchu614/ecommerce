import React from 'react';
import { Link } from 'react-router-dom';


export default function Product(props) {
    const { product } = props;
    return(
        <div key={product._id} className="card secondary">
            <Link to={`/product/${product._id}`}>
                <img className="secondary"
                src={product.images}
                alt={product.name} 
                />
            </Link>
            <div className="card-body secondary">
                <Link to={'/product/${product._id}'}>
                    <h2>{product.name}</h2>
                </Link>
                <div className="row">
                    <div className="price">${product.price}</div>
                </div>
                
            </div>
        </div>
    )
}
