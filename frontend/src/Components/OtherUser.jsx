import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "../Redux/userSlice"
import { useNavigate } from "react-router-dom"
import { WindowSizeContext } from "./Hooks/windowSizeContext"

const OtherUser = ({ otherUser }) => {
  const dispatch = useDispatch()
  const { windowWidth } = useContext(WindowSizeContext)

  const navigate = useNavigate()
  const { selectedUser, onlineUsers } = useSelector((store) => store.user)
  const isOnline = onlineUsers?.includes(otherUser?._id)
  const selectUserHandler = (user) => {
    dispatch(setSelectedUser(user))

    //  if (windowWidth < 640) {
    //    navigate(`/${otherUser?.fullName}`)
    //  }
  }
  useEffect(() => {}, [windowWidth])
  return (
    <div className="h-fit  ">
      <div
        onClick={() => selectUserHandler(otherUser)}
        className={` ${
          selectedUser?._id === otherUser?._id
            ? "bg-zinc-200 text-black"
            : " text-white"
        } flex gap-3   items-center  py-1  px-1   rounded-md `}>
        <div className={`avatar  py-0 ${isOnline ? "online" : ""} `}>
          <div className="sm:w-12 w-10 cursor-pointer  rounded-full">
            <img src={otherUser?.profilePhoto} alt="user_Image" className="" />
          </div>
        </div>
        <div className=" py-0  block h-fit ">
          <div className="  flex items-center     ">
            <span className="cursor-pointer  font-semibold">
              {otherUser?.fullName}
            </span>
          </div>
        </div>
      </div>
      <div className="divider m-0 p-0 h-1"></div>
    </div>
  )
}

export default OtherUser
