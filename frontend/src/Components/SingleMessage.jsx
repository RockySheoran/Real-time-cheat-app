import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import OtherUser from "./OtherUser"

const SingleMessage = ({ message }) => {
  const { userData } = useSelector((store) => store.user)
  const { selectedUser } = useSelector((store) => store.user)

  // Ensure message has createdAt field
  const utcDateStr = message?.createdAt
  const utcDate = new Date(utcDateStr)

  // Convert to Indian Standard Time (IST)
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000) // UTC + 5:30 hours
  const time = istDate.toISOString() // Get ISO string in IST

  // console.log(time)

  const scroll = useRef()

  // useEffect hook should always be at the top level
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  // Handle invalid date case
  if (isNaN(utcDate.getTime())) {
    // console.log("Invalid UTC date.")
    return null // Return null if the date is invalid
  }

  return (
    <div
      ref={scroll}
      className={`chat  ${
        userData?.id === message?.senderId ? " chat-end " : " chat-start"
      }`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              userData?.id === message?.senderId
                ? userData?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        {/* Displaying the time in HH:mm format */}
        <time className="text-xs opacity-50 text-white">
          {time?.split("T")[1].slice(0, 5)}
        </time>
      </div>
      <div
        className={`chat chat-bubble  ${
          userData?.id === message?.senderId ? " bg-white text-black" : ""
        }`}>
        {message?.message}
      </div>
      {/* <div className="chat-footer opacity-50">Delivered</div> */}
    </div>
  )
}

export default SingleMessage
