import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

import { selectorToken } from '../store/authenticationSlice'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const auth = useSelector(selectorToken)

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return children
}

export default RequireAuth
