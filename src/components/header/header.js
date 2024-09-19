import { Link, Outlet, useNavigate } from 'react-router-dom'
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
            <Link to="/sign-in">
              <Button className="header__btn" type="text">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="header__btn header__btn--register">Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article">
              <Button className="header__btn header__btn--create">Create article</Button>
            </Link>
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
                navigate('/articles')
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
