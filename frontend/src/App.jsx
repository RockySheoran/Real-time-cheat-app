import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
import Home from "./Components/Home"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import { useContext, useDeferredValue, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { backend_url } from "./utils/API"
import { setSocket } from "./Redux/socketSlice"
import { setOnlineUsers, setUserData } from "./Redux/userSlice"
import ProductRoute from "./Components/ProductRoute"
import MessageContainer from "./Components/MessageContainer"
import SideBar from "./Components/SideBar"
import useGetOtherUser from "./Components/Hooks/useGetOtherUser"
import { WindowSizeContext } from "./Components/Hooks/windowSizeContext"
import useCookiesHandle from "./Components/Hooks/useCookiesHandle"

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
    element: (
      <ProductRoute>
        <Login />
      </ProductRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProductRoute>
        <SignUp />
      </ProductRoute>
    ),
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
  const dispatch = useDispatch();
  const { windowWidth } = useContext(WindowSizeContext)
useCookiesHandle();
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
    <div
      className={`${
        windowWidth <= 640 ? "App px-2 pt-1" : "h-screen p-4"
      }  w-screen   flex items-center justify-center  `}>
      <></>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
