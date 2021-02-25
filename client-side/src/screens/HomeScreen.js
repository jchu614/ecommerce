import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import MessageBox from '../components/MessageBox.js';
import LoadingBox from '../components/LoadingBox.js';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../stylesheet/HomeScreen.css';
import { changeNavbar } from '../actions/websiteActions.js';
import { CHANGE_NAVBAR_RESET } from '../constants/websiteConstants.js';
import ProductIcon from '../components/ProductIcon';
import landing from '../stylesheet/images/landing.jpg';
import newarrival from "../stylesheet/images/newarrival.jpg";
import team from "../stylesheet/images/team.jpg";
import bill from "../stylesheet/images/billobill.jpg";
import gift from "../stylesheet/images/gift.jpg";

export default function HomeScreen() {
    const [trigger, setTrigger] = useState(false);
    const [shuffledArray, setShuffledArray] = useState([]);
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;
    
    
    // FOR LISTING PRODUCTS
    // useEffect(() => {
    //     dispatch(listProducts({}))
    // }, [dispatch]);

    // FOR CHANGING NAVBAR
    useEffect(() =>{
        dispatch(changeNavbar())
    },[trigger])

    //FOR UNMOUNT RESETTING NAVBAR
    useEffect(() => {
        return () => {
            dispatch({type: CHANGE_NAVBAR_RESET})
        }
    }, [])

    // RUNNING TRIGGER FOR NAVBAR
    const runTrigger = () => {
        window.scrollY >= 120 ? setTrigger(true) : setTrigger(false)
    }
    window.addEventListener('scroll', runTrigger)

    // SHUFFLING THE PRODUCTS FOR RANDOMIZED HOME SCREEN
    const shuffle = array => {
        const shuffledArray = array.sort(() => Math.random() - 0.5)
        setShuffledArray(shuffledArray.slice(1, 5));
    }

    
    const landingScreenLoaded = () => {
        return( 
            <div className="landing-page">
                <div>
                    <div className="landing-background">
                        <img className= "landing-image" src={landing} alt="landing page image" />
                    </div>
                    <div className="top row landing-container-1">
                        <div className="col-1 sub-landing-1-1">
                            <a className="link" href="search/name/" >
                                <img 
                                    className="landing-image" 
                                    src={newarrival} 
                                    alt="new arrivals" 
                                />
                            </a>
                            <div className="arrival-header resize-center">
                                <a className="link" href="search/name/" > 
                                    <h1 style={{letterSpacing: "0.13em"}}>New Arrivals</h1>
                                    <h2>Starting at $10</h2> 
                               </a>
                            </div>
                        </div>
                        <div className="col-1 sub-landing-1-2">
                            <div className="sub-landing-1-2-1">
                                <img 
                                    className= "landing-image" 
                                    src={gift} 
                                    alt="landing page image" 
                                    style={{zIndex: "-1"}}
                                /> 
                                <div style={{marginRight: "1rem", marginTop:"-20rem"}} >
                                    <h2>Limited Time Offer</h2>
                                    <h1>Free Shipping on orders over $100</h1>
                                    <h2>until end of month</h2>
                                </div>
                            </div>
                            <div className="sub-landing-1-2-2 row"> 
                                <div className="landing-product row">
                                { 
                                    shuffledArray.slice(0,1).map(product => (
                                        <div className="top row landing-container-2">
                                            <div className="col-1 sub-landing-2-1">
                                                <ProductIcon key={product._id} product={product} />
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                                <div className="landing-product">
                                { 
                                    shuffledArray.slice(1,2).map(product => (
                                        <div className="top row landing-container-2">
                                            <div className="col-1 sub-landing-2-1 end">
                                                <ProductIcon key={product._id} product={product} />
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-container">
                        <div className="carousel">
                            <div className="slides">
                                <div id="slide-1">
                                { 
                                    shuffledArray.slice(0,1).map(product => (
                                        <div className="slide">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    ))
                                }
                                </div>
                                <div id="slide-2">
                                { 
                                    shuffledArray.slice(1,2).map(product => (
                                        <div className="slide">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    ))
                                }
                                </div>
                                <div id="slide-3">
                                { 
                                    shuffledArray.slice(2,3).map(product => (
                                        <div className="slide">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    ))
                                }
                                </div>
                                <div id="slide-4">
                                { 
                                    shuffledArray.slice(3,4).map(product => (
                                        <div className="slide">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                            <HashLink 
                                to="#slide-1"
                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center'})} 
                            />
                            <HashLink 
                                to="#slide-2"
                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center'})} 
                            />
                            <HashLink 
                                to="#slide-3"
                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center'})} 
                            />
                            <HashLink 
                                to="#slide-4"
                                scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center'})} 
                            />
                        </div>
                    </div>
                    <div className="landing-container-2 top row">
                        <div className="col-1 sub-landing-2-1 row">
                            <div className="landing-product">
                            { 
                                shuffledArray.slice(2,3).map(product => (
                                    <div className="top row landing-container-2">
                                        <div className="col-1 sub-landing-2-1 start">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                            <div className="landing-product">
                            { 
                                shuffledArray.slice(3,4).map(product => (
                                    <div className="top row landing-container-2">
                                        <div className="col-1 sub-landing-2-1">
                                            <ProductIcon key={product._id} product={product} />
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="col-1 sub-landing-2-2">
                            <a 
                                className="link" 
                                href="/seller/60199d02b34e53184844f67f" 
                                style={{marginLeft: "0"}}
                            >
                                <img 
                                    className="landing-image" 
                                    src={bill} 
                                    alt="Bill o Bill Collections" 
                                />
                            </a>
                            <div style={{marginTop: "-18rem"}}>
                                <a 
                                    className="link resize-center" 
                                    href="/seller/60199d02b34e53184844f67f" 
                                    style={{marginLeft: "0"}}
                                > 
                                    <h1 style={{letterSpacing: "0.13em"}}>Chairs du Provance</h1>
                                    <h2>Bill o Bill Collection</h2> 
                               </a>
                            </div>
                        </div>   
                    </div>
                    <div className="landing-container-3 top row">
                        <div className="sub-landing-3-1">
                            <div className="landing-image-container">
                                <img className= "landing-image" src={team} alt="landing page image" />
                            </div>
                        </div>
                        <div className="sub-landing-3-2">
                            <h1>Join Our Team!</h1>
                            <p>
                                We are always looking for entrepeneurs and small businesses who need
                                a platform to showcase their products! Become a seller and start today 
                                with your own seller page, and items that you can put up front! 
                            </p>
                            <div className="button secondary"><a href={`mailto: admin@admin.com`}>Message Us!</a></div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
    return(
        <div className="landing-page">
            {loading ? (
                <LoadingBox /> 
            ) : error ? (
                <MessageBox variant="danger" >{error}</MessageBox>
            ) : ( products && shuffledArray.length ? ( landingScreenLoaded()
            )
            : shuffle(products)
            )}    
        </div>
    )
}