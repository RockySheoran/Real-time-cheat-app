import React, { useContext, useEffect } from "react"
import SendInput from "./SendInput"
import Message from "./Message"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "../Redux/userSlice"
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { WindowSizeContext } from "./Hooks/windowSizeContext"

const MessageContainer = () => {
  const { selectedUser, userData, onlineUsers } = useSelector(
    (store) => store.user
  )
  const dispatch = useDispatch()
  const isUserOnline = onlineUsers && onlineUsers?.includes(selectedUser?._id)
  const navigate = useNavigate()
  //    useEffect(() =>{
  // return () => dispatch(setSelectedUser(null))
  //    },[])
  const { windowWidth } = useContext(WindowSizeContext)

  const homePage = () => {
    navigate("/")
    dispatch(setSelectedUser(null))

    // console.log("sd")
  }

  return (
    <>
      {selectedUser !== null ? (
        <div className={`${windowWidth < 640 ? "w-screen " : "h-[100%] "}`}>
          <div
            className={`${
              windowWidth < 640
                ? "h-screen  min-w-[90%]   rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 "
                : ""
            } sm:min-w-[300px] md:min-w-[450px] h-[100%]  flex flex-col     `}>
            <div
              className={`  flex  gap-3 items-center text-center p-1 h-fit bg-slate-600  px-2 py-1  `}>
              <div className={`${windowWidth < 640 ? "block " : "hidden"}`}>
                <FaHome onClick={homePage} size={30} color="red" />
              </div>
              <div className={`avatar ${isUserOnline ? "online" : ""} `}>
                <div className="w-12 rounded-full">
                  <img
                    src={selectedUser?.profilePhoto}
                    alt="user_Image"
                    className=""
                  />
                </div>
              </div>
              <div className="   block h-fit  ">
                <div className=" flex items-center  ">
                  <p className="text-white  font-semibold">
                    {selectedUser?.fullName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 h-[70%]">
              <Message />
            </div>
            <div className="">
              <SendInput />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            windowWidth < 640
              ? "h-screen text-white min-w-[280px] justify-center items-center rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 "
              : ""
          } sm:min-w-[300px] md:[450px]  text-white  flex flex-col  justify-center items-center   `}>
          <h1 className="text-4xl font-bold "> Hi {userData?.fullName} </h1>
          <h1 className="text-2xl ">Start Conversation</h1>
        </div>
      )}
    </>
  )
}

export default MessageContainer
