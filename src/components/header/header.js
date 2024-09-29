import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import './header.scss'

import {
  selectorImage,
  selectorToken,
  selectorUsername,
  logOutUser,
  fetchCurrentUser,
} from '../../store/authenticationSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const authentication = useSelector(selectorToken)
  const nameUser = useSelector(selectorUsername)
  const imageUser = useSelector(selectorImage)

  useEffect(() => {
    if (authentication) dispatch(fetchCurrentUser(authentication))
  }, [authentication, nameUser])

  return (
    <>
      <div className="header">
        <Link to="/" className="logo">
          Realworld Blog
        </Link>
        {!authentication ? (
          <>
            <Button className="header__btn" type="text" onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
            <Button className="header__btn header__btn--register" onClick={() => navigate('/sign-up')}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button className="header__btn header__btn--create" onClick={() => navigate('/new-article')}>
              Create article
            </Button>
            <Link to="/profile">
              <div className="header__user user">
                <p className="user__name">{nameUser}</p>
                <Avatar size="large" icon={<UserOutlined />} src={imageUser} />
              </div>
            </Link>
            <Button
              className="header__btn header__btn--out"
              onClick={() => {
                dispatch(logOutUser())
                navigate('/articles', { state: { from: location } })
              }}
            >
              Log Out
            </Button>
          </>
        )}
      </div>
      <Outlet />
    </>
  )
}
