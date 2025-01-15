import React, { useContext, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import OtherUsers from "./OtherUsers"
import axios from "axios"
import { USER_END_POINT_API } from "../utils/API"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSearchUser, setSelectedUser, setUserData } from "../Redux/userSlice"
import { WindowSizeContext } from "./Hooks/windowSizeContext"

const SideBar = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const { windowWidth } = useContext(WindowSizeContext)

  const logOutHandle = async () => {
    try {
      const res = await axios.get(`${USER_END_POINT_API}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
        dispatch(setUserData(null))
        dispatch(setSelectedUser(null))
      }
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message)
    }
  }
  useEffect(() => {
    dispatch(setSearchUser(input))
    // console.log(input)
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(setSearchUser(input))
    //  setInput("")
  }

  return (
    <div className={`${windowWidth < 640 ? "w-screen  " : "h-[100%] "}`}>
      <div
        className={`${
          windowWidth < 640
            ? "h-screen  min-w-[80%] px-1 py-1  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 "
            : ""
        } w-full h-[100%]  flex flex-col  px-1 py-1   `}>
        <form
          onSubmit={handleSubmit}
          className="flex items-center  justify-center gap-2">
          <input
            type="text"
            name="user"
            value={input.user}
            onChange={(e) => setInput(e.target.value)}
            className="input h-8 input-border rounded-lg bg-white text-slate-800"
            placeholder="search..."
          />
          <button type="Submit" className="btn btn-sm  bg-gray-600">
            <FaSearch size="24px" />
          </button>
        </form>
        <div className="divider divider-success  "></div>
        <div className="h-[72%]">
          <OtherUsers />
        </div>
        <div className="sm:mt-auto mt-5 ">
          <button onClick={logOutHandle} className="btn btn-sm ">
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar
