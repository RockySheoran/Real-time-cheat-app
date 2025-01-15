import axios from "axios"
import React, { useEffect } from "react"
import { USER_END_POINT_API } from "../../utils/API"
import { useDispatch } from "react-redux"
import { setOtherUser } from "../../Redux/userSlice"

const useGetOtherUser = () => {
  const dispatch = useDispatch()
  const facthOtherUser = async () => {
    try {
      const res = await axios.get(`${USER_END_POINT_API}/otherUser`, {
        withCredentials: true,
      })
      // console.log(res)
      dispatch(setOtherUser(res.data.otherUser))
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    facthOtherUser()
  }, [])
}

export default useGetOtherUser
