import React from "react"
import SingleMessage from "./SingleMessage"
import useGetMessage from "./Hooks/useGetMessage"
import { useSelector } from "react-redux"
import useGetRealTimeMessage from "./Hooks/useGetRealTimeMessage"

const Message = () => {
  useGetMessage()
  useGetRealTimeMessage()

  const { getMessage } = useSelector((store) => store.message)

  // Ensure getMessage is an array before mapping
  if (!Array.isArray(getMessage)) return null // Prevent rendering if not an array

  // console.log(getMessage)

  return (
    <div
      className="px-4 flex-1 overflow-auto h-full scrollbar !scrollbar-thumb-rounded-full scrollbar-thumb-red-500 scrollbar-track-gray-300 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg"
      style={{
        scrollbarWidth: "thin", // For Firefox
        scrollbarColor: "red gray", // For Firefox
      }}>
      <style>
        {`
          /* For Webkit Browsers */
          ::-webkit-scrollbar {
            width: 10px; /* Custom scrollbar width */
          }
          ::-webkit-scrollbar-track {
            background: #d1d5db; /* Tailwind's gray-300 */
            border-radius: 8px !important;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #ef4444; /* Tailwind's red-500 */
            border-radius: 8px !important;
            border: 3px solid transparent; /* Adds spacing around thumb */
            background-clip: content-box;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #dc2626; /* Tailwind's red-700 for hover effect */
          }
        `}
      </style>
      {getMessage.map((message) => (
        <SingleMessage key={message?._id} message={message} />
      ))}
    </div>
  )
}

export default Message
