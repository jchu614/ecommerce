import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions.js';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants.js';
import '../stylesheet/ProductScreen.css';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product} = productDetails;
    const productReviewCreate = useSelector( state => state.productReviewCreate);
    const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = productReviewCreate;
    const userSignin = useSelector( state => state.userSignin);
    const { userInfo } = userSignin;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if(successReviewCreate) {
            window.alert('Review Submitted Successfully!');
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    const submitHandler = e => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        } else {
            alert('Please enter comment and rating!');
        }
    }
    return(
        <div className="padding">
            {loading ? (
                <LoadingBox /> 
            ) : error ? (
                <MessageBox variant="danger" >{error}</MessageBox>
            ) : ( 
            <div>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.images} alt={product.name}/>
                    </div>
                    <div className="col-1 product-description">
                        <ul>
                            <li>{product.category}</li>
                            <li>
                                <h1 className="product-header">{product.name}</h1>
                                <p style={{marginTop: "0"}}><em>{product.brand}</em></p>
                            </li>
                            <hr align="left"/>
                            <li>
                                Price: ${product.price}
                            </li>
                            <hr align="left"/>
                            <li>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </li>
                            <li>
                                <p style={{lineHeight: "1.5em"}}>{product.description}</p>
                            </li>
                        </ul>
                        <div className="card card-body product padding">
                            <ul>
                                <li>
                                    Seller <h2>
                                        <Link to={`/seller/${product.seller._id}`}>
                                            {product.seller.seller.name}
                                        </Link>
                                    </h2>
                                    <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews}></Rating>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock > 0 ? (
                                            <span className="success">In Stock</span>
                                            ) : (
                                            <span className="danger">Out of Stock</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map( (x) => (
                                                            <option key={x+1} value={x+1}> {x + 1} </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                        <li>
                                            <button onClick = {addToCartHandler} className="primary block">Add To Cart</button>
                                        </li>
                                    </>
                                    )
                                }
                            </ul>
                        </div>
                    </div>    
                </div>
                <div className="review-box">
                    <div style={{width: "75%"}}>
                        <h2 id="reviews">Reviews</h2>
                        {product.reviews.length === 0 && (
                            <MessageBox>There are no reviews!</MessageBox>
                        )}
                        <ul>
                            {product.reviews.map(review => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                    <p>
                                        {review.comment}
                                    </p>
                                </li>
                            ))}
                            <li style={{margin: "4rem 0"}}>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Write a Customer Review</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Rating</label>
                                            <select id="rating" value={rating} onChange={e => setRating(e.target.value)}>
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Below Average</option>
                                                <option value="3">3 - Average</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Comment</label>
                                            <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)}></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">Submit</button>
                                            <div>
                                                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Please <Link to="/signin">Sign In</Link> to write a review!
                                    </MessageBox>
                                )}
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            )}    
        </div>    
    )
}