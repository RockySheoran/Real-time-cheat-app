import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import OtherUser from "./OtherUser"

const SingleMessage = ({ message }) => {
  const { userData } = useSelector((store) => store.user)
  const { selectedUser } = useSelector((store) => store.user)

  const scroll = useRef()
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

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
        <time className="text-xs opacity-50 text-white">
          {message.createdAt.split("T")[1].slice(0, 5)}
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
