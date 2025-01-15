import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGetMessage } from "../../Redux/messageSlice"

const useGetRealTimeMessage = async () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((store) => store.socket)
  const { getMessage } = useSelector((store) => store.message)

  useEffect(() => {
    if (!Array.isArray(getMessage)) {
      console.error("getMessage is not an array:", getMessage)
      return
    }

    socket?.on("newMessage", (newMessage) => {
      dispatch(setGetMessage([...getMessage, newMessage]))
      console.log("getMessage before update:", getMessage)
    })
    return () => socket?.off("newMessage")
  }, [setGetMessage, getMessage, dispatch, socket])
}

export default useGetRealTimeMessage
