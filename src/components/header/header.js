import { Button } from 'antd'

import './header.scss'

export default function Header() {
  return (
    <div className="header">
      <p className="logo">Realworld Blog</p>
      <Button className="header_btn" type="text">
        Sign In
      </Button>
      <Button className="header_btn header_btn-register">Sign Up</Button>
    </div>
  )
}
