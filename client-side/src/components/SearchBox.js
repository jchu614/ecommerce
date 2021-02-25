import React, { useState } from 'react';

export default function SearchBox(props) {
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    }
    return(
        <form className="search" onSubmit={submitHandler}>
            <div style={{flexDirection: "row"}}>
                <input type="text" name="q" id="q" onChange={e => setName(e.target.value)} style={{height: "3.6rem", width: "26rem"}} placeholder="Search Items"></input>
                <button type="submit">
                    <i className="fa fa-search"></i> 
                </button>
            </div>
        </form>
    )
}