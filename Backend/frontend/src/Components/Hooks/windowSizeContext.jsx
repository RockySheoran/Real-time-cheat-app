// WindowSizeContext.js
import React, { createContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const WindowSizeContext = createContext()

export const WindowSizeProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { selectedUser, userData } = useSelector((store) => store.user)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <WindowSizeContext.Provider value={{ windowWidth }}>
      {children}
    </WindowSizeContext.Provider>
  )
}
