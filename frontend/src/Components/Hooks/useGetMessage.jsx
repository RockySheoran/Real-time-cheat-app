import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGetMessage } from "../../Redux/messageSlice"
import { MESSAGE_END_POINT_API } from "../../utils/API"

const useGetMessage = () => {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((store) => store.user)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `${MESSAGE_END_POINT_API}/get/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        )
        // console.log(res)
        if (res.data.success) {
          dispatch(setGetMessage(res.data.getConversation))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessage()
  }, [selectedUser])
}

export default useGetMessage
