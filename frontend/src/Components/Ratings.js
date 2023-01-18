import React from 'react'
import PropTypes from 'prop-types'

function Ratings({rating,reviews,color}) {
    if(rating>5){
        rating=5
    }
    function createElements(n){
        var elements = [];
        
        for(var i =1; i <=n; i++){
            elements.push(<i id={i} style={{color}} className="fas fa-star"></i>);
        }
        // console.log(n);
        return elements;
    }
    return (
        <div>
            <span>
                {createElements(rating)}
                </span>
            <span >
                <i style={{color}} className={(rating-Math.floor(rating))===0?"":(rating-Math.floor(rating))>=0.5?"fas fa-star-half-alt":"far fa-star"}></i>
                
                
            </span>
            <span><br/> &nbsp;{reviews} </span>
        </div>
    )
}
Ratings.defaultProps={
    color:"#f8e825"
}
Ratings.prototype={
    rating: PropTypes.number.isRequired
}

export default Ratings
