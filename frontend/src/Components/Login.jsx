import React, { useState } from "react"
import { IoEye } from "react-icons/io5"
import { IoEyeOff } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { USER_END_POINT_API } from "../utils/API"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setUserData } from "../Redux/userSlice"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passShow, setpassShow] = useState({
    password: false,
  })
  const [input, setInput] = useState({
    userName: "",
    password: "",
    email: "",
  })

  const selectGender = (value) => {
    setInput({ ...input, gender: value })
  }
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(input)
    try {
      console.log(`${USER_END_POINT_API}/login`)
      const res = await axios.post(`${USER_END_POINT_API}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      // console.log(res)
      if (res.data.success) {
        dispatch(setUserData(res.data.newUser))
        toast.success(res.data.message)
        navigate("/")
      }
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    }
    setInput({
      userName: "",
      password: "",
      email: "",
    })
  }
  return (
    <div className="login max-w-96 w-screen   ">
      <div className="h-full mx-auto   w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className=" font-bold text-red-500 text-xl ">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="userName"
              className="label text-gray-800 label-text text-base px-2 py-1">
              User Name
            </label>
            <input
              type="text"
              value={input.userName}
              onChange={handleInput}
              className="w-full bg-white text-gray-700 input-bordered input h-10"
              placeholder="Enter your user name"
              id="userName"
              name="userName"
            />
          </div>
          <div className="divider divider-error text-red-800">OR</div>
          <div className="">
            <label
              htmlFor="email"
              className="label text-gray-800 label-text text-base px-2 py-1">
              Email
            </label>
            <input
              type="text"
              value={input.email}
              onChange={handleInput}
              className="w-full bg-white text-gray-700 input-bordered input h-10"
              placeholder="Enter your email"
              id="email"
              name="email"
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="label text-gray-800 label-text text-base px-2 py-1">
              Password
            </label>
            <div className="h-10 relative">
              <input
                type={passShow.password ? "text" : "password"}
                value={input.password}
                onChange={handleInput}
                className="w-full bg-white pr-12 text-gray-700 input-bordered input h-10"
                placeholder="Enter your password"
                id="password"
                name="password"
              />
              <span
                onClick={() =>
                  setpassShow({ ...passShow, password: !passShow.password })
                }
                className="absolute block w-fit text-black cursor-pointer z-100 right-4 bottom-[9px] top-auto   text-2xl   "
                id="password">
                {passShow.password == false ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>
          <div className=" mt-5">
            <button className="btn hover:bg-slate-300 border bg-slate-200 text-black btn-sm border-slate-700  btn-block ">
              Login Up
            </button>
          </div>
        </form>
        <h2 className="text-gray-800 mt-4 text-center ">
          {" "}
          Don't have an account?{" "}
          <Link to="/signup" className=" ml-3 text-red-500">
            SignUp{" "}
          </Link>{" "}
        </h2>
      </div>
    </div>
  )
}

export default Login
