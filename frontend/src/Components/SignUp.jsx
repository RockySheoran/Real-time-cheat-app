import React, { useState } from "react"
import axios from "axios"
import { IoEye } from "react-icons/io5"
import { IoEyeOff } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { USER_END_POINT_API } from "../utils/API"
import toast from "react-hot-toast"


const SignUp = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const [passShow, setpassShow] = useState({
    password: false,
    Confirm_Password: false,
  })
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
    confirmPassword: "",
    gender: "",
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
    // window.alert(input.password)

    try {
      setLoading(true);
      // console.log(`${USER_END_POINT_API}/register`)
      const res = await axios.post(`${USER_END_POINT_API}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      // console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
        setInput({
          fullName: "",
          userName: "",
          password: "",
          email: "",
          confirmPassword: "",
          gender: "",
        })
      }
    } catch (e) {
      console.log(e)
      // window.alert(e)
      toast.error(e.response.data.message)
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="register max-w-96 w-screen ">
      <div className="h-full   w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className=" font-bold text-red-500 text-xl ">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="fullName"
              className="label label-text text-gray-800 text-base px-2 py-1">
              Full Name
            </label>
            <input
              value={input.fullName}
              onChange={handleInput}
              type="text"
              className="w-full bg-white text-gray-700 input-bordered input h-10"
              placeholder="Enter your full name"
              id="fullName"
              name="fullName"
            />
          </div>
          <div className="">
            <label
              htmlFor="userName"
              className="label text-gray-800 label-text text-base p-2">
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
          <div className="">
            <label
              htmlFor="email"
              className="label text-gray-800 label-text text-base p-2">
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
              className="label text-gray-800 label-text text-base p-2">
              Password
            </label>
            <div className="h-10 relative">
              <input
                type={passShow.password ? "text" : "password"}
                value={input.password}
                onChange={handleInput}
                className="w-full pr-12 bg-white text-gray-700 input-bordered input h-10"
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
          <div className="">
            <label
              htmlFor="Conform Password"
              className="label text-gray-800  label-text text-base p-2">
              Conform Password
            </label>
            <div className="h-10 mb-2 heroEye relative">
              <input
                value={input.confirmPassword}
                onChange={handleInput}
                type={passShow.Confirm_Password ? "text" : "password"}
                className="w-full bg-white pr-12 text-gray-700 input-bordered input h-10"
                placeholder="Enter your Conform Password"
                id="Conform Password"
                name="confirmPassword"
              />

              <span
                onClick={() =>
                  setpassShow({
                    ...passShow,
                    Confirm_Password: !passShow.Confirm_Password,
                  })
                }
                className="absolute block w-fit text-black cursor-pointer z-100 right-4 bottom-[9px] top-auto   text-2xl   "
                id="Confirm_Password">
                {passShow.Confirm_Password == false ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-900 my-4 ">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={input.gender === "Male"}
                onChange={() => selectGender("Male")}
                defaultChecked
                className="checkbox checkbox-accent"
              />
              <p>Male</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={input.gender === "Female"}
                onChange={() => selectGender("Female")}
                defaultChecked
                className="checkbox checkbox-accent"
              />
              <p>Female</p>
            </div>
          </div>
          <div className="">
            {loading ? (
              <button
                disabled
                className="btn cursor-wait hover:bg-slate-300 border bg-slate-200 text-black btn-sm border-slate-700  btn-block ">
                <span className="loading loading-spinner text-secondary"></span>{" "}
                <span className="text-black" > please wait</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn hover:bg-slate-300 border bg-slate-200 text-black btn-sm border-slate-700  btn-block ">
                Sign Up
              </button>
            )}
          </div>
        </form>
        <h2 className="text-gray-800 mt-4 text-center ">
          {" "}
          Already have account?{" "}
          <Link to="/login" className=" ml-3 text-red-500">
            Login{" "}
          </Link>{" "}
        </h2>
      </div>
    </div>
  )
}

export default SignUp
