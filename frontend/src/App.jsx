import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import Home from "./Components/Home"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import { useDeferredValue, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { backend_url } from "./utils/API"
import { setSocket } from "./Redux/socketSlice"
import { setOnlineUsers } from "./Redux/userSlice"
import ProductRoute from "./Components/ProductRoute"
import MessageContainer from "./Components/MessageContainer"
import SideBar from "./Components/SideBar"
import useGetOtherUser from "./Components/Hooks/useGetOtherUser"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProductRoute>
        {" "}
        <Home />
      </ProductRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/:name",
    element: <MessageContainer />,
  },
  {
    path: "/OtherUser",
    element: <SideBar />,
  },
])

function App() {
  // const[socketUser,setSocketUser] = useState(null);
  const { userData } = useSelector((store) => store.user)
  const { socket } = useSelector((store) => store.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      const socketio = io(`${backend_url}`, {
        query: {
          userId: userData?.id,
        },
      })
      dispatch(setSocket(socketio))

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
      return () => socketio.close()
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])

  return (
    <div className="App h-screen w-screen p-4  flex items-center justify-center  ">
      <></>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
