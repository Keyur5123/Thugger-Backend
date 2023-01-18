import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'

function SearchBox({}) {
    let history=useHistory()
    const [keyword, setkeyword] = useState("")
    const SearchProduct=(e)=>{

        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }
        else{
            history.push("/")
        }
    }
    return (
        <div>
            <Form onSubmit={SearchProduct} inline>
                    
                <Form.Control type="text" name="q" placeholder="Search Product" value={keyword} onChange={(e)=>setkeyword(e.target.value)} className="mr-sm-2 ml-sm-5 my-sm-3" />
                <Button type="submit" variant="outline-success" className="p-2">Search Product</Button>
            </Form>
        </div>
    )
}

export default SearchBox
