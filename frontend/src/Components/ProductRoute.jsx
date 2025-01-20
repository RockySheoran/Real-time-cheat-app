import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProductRoute = ({ children }) => {
  const { userData } = useSelector((store) => store.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!userData || userData.length === 0) {
      navigate("/login")
      console.log("Redirecting to login because userData is empty")
    }
    else{
      navigate("/")
    }
  }, [userData, navigate])

  // console.log("wdfwdsfsadss")
  return <>{children}</>
}

export default ProductRoute
