import React, { useContext, useEffect, useState } from "react"
import SideBar from "./SideBar"
import MessageContainer from "./MessageContainer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { WindowSizeContext } from "./Hooks/windowSizeContext"

const Home = () => {
  const { selectedUser, userData } = useSelector((store) => store.user)

  const { windowWidth } = useContext(WindowSizeContext)
  const navigate = useNavigate()

  return (
    <div className="flex p-0 mx-auto h-screen  sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      {windowWidth <= 640 && !selectedUser ? <SideBar /> : ""}

      {windowWidth > 640 ? (
        <>
          <SideBar /> <MessageContainer />
        </>
      ) : (
        ""
      )}
      {windowWidth < 640 && selectedUser !== null ? <MessageContainer /> : ""}
    </div>
  )
}

export default Home
