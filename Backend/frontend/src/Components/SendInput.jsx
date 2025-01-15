import axios from "axios"
import React, { useRef, useState } from "react"
import { IoIosSend } from "react-icons/io"
import { MESSAGE_END_POINT_API } from "../utils/API"
import { useDispatch, useSelector } from "react-redux"
import { setGetMessage } from "../Redux/messageSlice"
const SendInput = () => {
  const [message, setMessage] = useState("")
  const { selectedUser } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  const { getMessage } = useSelector((store) => store.message)
  const messageHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${MESSAGE_END_POINT_API}/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      // console.log(res)
      if (res.data.success) {
        setMessage("")
        dispatch(setGetMessage([...getMessage, res?.data?.newMessage]))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sm:px-4 sm:my-3 px-1 py-2">
      <form onSubmit={messageHandler} className=" w-full relative ">
        <div className="">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            type="text"
            placeholder="Enter your message"
            className=" bg-slate-600 text-white placeholder:text-white   border block w-full border-zinc-600      rounded-lg pl-3 pr-16 py-1 text-md"
          />
        </div>
        <button
          type="submit"
          className="block absolute top-0 btn-sm  right-0 w-fit bg-indigo-500 rounded-md border ">
          <IoIosSend size={30} />
        </button>
      </form>
    </div>
  )
}

export default SendInput
