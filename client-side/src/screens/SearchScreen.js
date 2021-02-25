import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import '../stylesheet/SearchScreen.css';
import { CHANGE_NAVBAR_RESET } from '../constants/websiteConstants';
import { changeNavbar } from '../actions/websiteActions';
import table from '../stylesheet/images/tablebackground.jpg';
import chair from '../stylesheet/images/chairbackground.jpg';
import sofa from '../stylesheet/images/sofabackground.jpg';
import set from "../stylesheet/images/furniture-set.jpg"
import bed from "../stylesheet/images/bedimage.jpg"
import other from "../stylesheet/images/search-landing-1.jpg"

export default function SearchScreen(props) {
    const {name = 'all', category = 'all', min=0, max=0, rating=0, order='newest', pageNumber = 1} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;
    const productCategoryList = useSelector(state => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
    const [trigger, setTrigger] = useState(false);

    // FOR LISTING ITEMS ON SEARCH PAGE
    useEffect(() => {  
        dispatch(
            listProducts({
                pageNumber,
                name: name !== 'all' ? name: '', 
                category: category !== 'all' ? category: '',
                min, max, rating, order,
            })
        );
    }, [dispatch, name, category, min, max, rating, order, pageNumber])

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

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    }

    // GETTING THE SEARCH NAME
    const urlArray = window.location.pathname.split('/');
    const nameLocation = urlArray.indexOf('name');
    const locationNumber = nameLocation + 1;
    const nameName = urlArray[locationNumber];
    const categoryLocation = urlArray.indexOf('category');
    const categoryLocationNumber = categoryLocation + 1;
    const categoryName = urlArray[categoryLocationNumber];

    return (
    <div id="search-page">
        <div className="search-landing-background">
            <img 
                className= "search-image" 
                src={
                 nameName.toLowerCase() === "chair" || categoryName.toLowerCase() === "chair" ? chair
                 :
                 nameName.toLowerCase() === "couch" 
                     || nameName.toLowerCase() === "sofa" 
                     || categoryName.toLowerCase() === "couch" 
                     || categoryName.toLowerCase() ==="sofa" 
                     ? sofa
                 :
                 nameName.toLowerCase() === "table" || categoryName.toLowerCase() === "table" ? table
                 :
                 nameName.toLowerCase() === "set" || categoryName.toLowerCase() === "furniture-set" ? set
                 :
                 nameName.toLowerCase() === "bed" || categoryName.toLowerCase() === "bed" ? bed
                 :
                 other
                } 
                alt="landing page image" 
            />
        </div>
        <div className="row options-bar">
            { loading ? (<LoadingBox></LoadingBox>)
            : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            <div className="options-bar-1">
                <div style={{fontSize: ".9em"}}>{products.length} Results</div>
                {nameName ? 
                    <div style={{textTransform: "capitalize", fontSize: "1.7em"}}>{nameName}</div>
                    : !nameName && categoryName ?
                    <div style={{textTransform: "capitalize", fontSize: "1.7em"}}>{categoryName}</div>
                    :
                    <div style={{textTransform: "capitalize", fontSize: "1.7em"}}>all</div>
                }
                <div className="row filter">
                    <div>Filter Search :</div>
                    <div className="search-options">
                        <div className="dropdown select" style={{paddingLeft: "0"}}>
                            <h4>Category <i className="fa fa-caret-down"></i></h4>
                            <div className="dropdown-content">
                                { loadingCategories ? (<LoadingBox></LoadingBox>)
                                : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>)
                                :
                                <div>
                                    <ul>
                                        <li>
                                            <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({category: 'all'})}>
                                                Any
                                            </Link>
                                        </li>
                                        {categories.map(c => (
                                            <li key={c}>
                                                <Link className={c === category ? 'active' : ''} to={getFilterUrl({category:c})}>
                                                    {c}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                }
                            </div>  
                        </div>
                        <div className="dropdown select">
                            <h4>Price <i className="fa fa-caret-down"></i></h4>
                            <div className="dropdown-content">
                                <ul>
                                    {prices.map((p) => (
                                        <li key={p.name}>
                                            <Link 
                                                to={getFilterUrl({min: p.min, max: p.max})}
                                                className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                                            >
                                                {p.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="dropdown select">
                            <h4>Average Rating <i className="fa fa-caret-down"></i></h4>
                            <div className="dropdown-content">
                                <ul>
                                    {ratings.map((r) => (
                                        <li key={r.name}>
                                            <Link 
                                                to={getFilterUrl({rating: r.rating})}
                                                className={ `${r.rating}` === `${rating}` ? 'active' : ''}
                                            >
                                                <Rating caption={" & up"} rating={r.rating}></Rating>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>  
                    </div>
                    
                </div>
            </div>
            }
            <div className="select-menu">
                Sort by { ' ' }
                <select 
                    value={order} 
                    onChange={e => {
                    props.history.push(getFilterUrl({order: e.target.value}))
                }}>
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Average Customer Reviews</option>
                </select>
            </div>
        </div>
        <div className="row top">
            <div className="col-3">
                { loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                <div>
                    <div className="row center" style={{paddingTop: "5rem"}}>
                        { products.map(product => (
                        <div>
                            <Product key={product._id} product={product} />
                        </div>
                        ))}
                    </div>
                    <div className="pagination row center">
                        {
                            [...Array(pages).keys()].map(x => (
                                <Link className={x+1 === page ? 'active' : ''} key={x+1} to={getFilterUrl({page: x+1})}>{x+1}</Link>
                            ))
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    </div>
    )
}
