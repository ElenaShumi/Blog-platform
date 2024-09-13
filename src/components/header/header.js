import { Link, Outlet } from 'react-router-dom'
import { Button } from 'antd'

import './header.scss'

export default function Header() {
  return (
    <>
      <div className="header">
        <Link to="/" className="logo">
          Realworld Blog
        </Link>
        <Link to="/sign-in">
          <Button className="header_btn" type="text">
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button className="header_btn header_btn-register">Sign Up</Button>
        </Link>
      </div>
      <Outlet />
    </>
  )
}
