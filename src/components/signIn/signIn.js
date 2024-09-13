import { Button } from 'antd'
import './signIn.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchLoginUser } from '../../store/authenticationSlice'

const SignIn = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const user = {
      email: form.email.value,
      password: form.password.value,
    }
    console.log(user)
    dispatch(fetchLoginUser(user))
  }

  return (
    <div className="main sign-in">
      <div className="sign-in__container container">
        <h2 className="container__title">Sign In</h2>
        <form onSubmit={handleSubmit} className="container__form form">
          <label className="form__label">
            Email address
            <br />
            <input className="form__input" type="email" name="email" required placeholder="Email address" />
          </label>
          <br />
          <label className="form__label">
            Password
            <br />
            <input className="form__input" type="password" required name="password" placeholder="Password" />
          </label>
          <br />
          <Button htmlType="submit" className="form__btn" size="large" type="primary">
            Create
          </Button>
          <p className="form__text">
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
