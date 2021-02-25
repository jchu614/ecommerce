import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Product from '../components/Product';
import '../stylesheet/SellerScreen.css';

export default function SellerScreen(props) {
    const sellerId = props.match.params.id;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const productList = useSelector(state => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({seller: sellerId}));
    }, [dispatch, sellerId])
    return(
        <div className="row top">
            <div className="col-1 seller-box">
                { loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <ul className="card card-body">
                        <li style={{margin: "0"}}>
                            <div className="seller-image">
                                <img src={user.seller.logo} alt={user.seller.name}></img>
                            </div>
                        </li>
                        <li className="padding">
                            <div>
                                <h1 style={{fontSize: "1.5em", margin: "0"}}>{user.seller.name}</h1>
                            </div>
                        </li>
                        <li className="padding-l">
                            <Rating rating={user.seller.rating} numReviews={user.seller.numReviews}></Rating>
                        </li>
                        <li className="padding" style={{lineHeight: "3rem"}}>
                            {user.seller.description}
                        </li>
                        <li className="padding">
                            <div class="centered">
                                <a className="button secondary" href={`mailto:${user.email}`}>Contact Seller</a>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
            <div className="col-2">
                { loadingProducts ? <LoadingBox></LoadingBox>
                    : errorProducts ? <MessageBox variant="danger">{errorProducts}</MessageBox>
                    :
                    (
                    <>
                        {products.length === 0 && (<MessageBox>No Product Found!</MessageBox>)}
                        <div className="row center">
                        { products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}