import React, { useEffect, useState } from "react"
import OtherUser from "./OtherUser"
import useGetOtherUser from "./Hooks/useGetOtherUser"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const OtherUsers = () => {
  useGetOtherUser()
  const { otherUser, selectedUser, searchUserText } = useSelector(
    (store) => store.user
  )
  const [filterUser, setFilterUser] = useState(otherUser)

  const searchOtherUser = () => {}

  useEffect(() => {
    if (searchUserText) {
      const filterUsers = otherUser?.filter((user) => {
        return user?.fullName
          ?.toLowerCase()
          .includes(searchUserText?.toLowerCase() || "")
      })
      if (!filterUsers) {
        toast.error("Your Friends not founds")
      }
      setFilterUser(filterUsers)
    } else {
      setFilterUser(otherUser)
    }
  }, [searchUserText, otherUser])
  if (!otherUser) return

  return (
    <div className="scrollbar-container overflow-auto h-[100%]  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {filterUser?.map((otherUser) => {
        return <OtherUser key={otherUser._id} otherUser={otherUser} />
      })}
    </div>
  )
}

export default OtherUsers
