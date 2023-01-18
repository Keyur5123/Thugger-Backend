import React from 'react'
import { Helmet } from "react-helmet";
function Meta({title,description,keywords}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps={
    title:"Welcome to Thugger",
    description:"We sells the best products for cheap",
    keywords:"Thugging"
}


export default Meta
