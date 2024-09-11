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
        <Button className="header_btn" type="text">
          Sign In
        </Button>
        <Button className="header_btn header_btn-register">Sign Up</Button>
      </div>
      <Outlet />
    </>
  )
}
