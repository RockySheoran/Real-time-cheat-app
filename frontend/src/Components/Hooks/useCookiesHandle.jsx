import React from 'react'
import Cookie from "js-cookie"

const useCookiesHandle = () => {
    const token  = Cookie.get("token");
    console.log(token)
    

  
}

export default useCookiesHandle
