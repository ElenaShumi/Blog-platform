import { Checkbox, Button } from 'antd'
import './signUp.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchRegisterUser } from '../../store/authenticationSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const user = {
      username: form.username.value,
      email: form.email.value,
      password: form.password[0].value,
    }

    dispatch(fetchRegisterUser(user))
    navigate('/articles')
  }

  return (
    <div className="main">
      <div className="sign-up__container container">
        <h2 className="container__title">Create new account</h2>
        <form onSubmit={handleSubmit} className="container__form form">
          <label className="form__label">
            Username
            <br />
            <input className="form__input" type="text" name="username" placeholder="Username" required />
          </label>
          <br />
          <label className="form__label">
            Email address
            <br />
            <input className="form__input" type="email" name="email" placeholder="Email address" required />
          </label>
          <br />
          <label className="form__label">
            Password
            <br />
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="6"
            />
          </label>
          <br />
          <label className="form__label">
            Repeat Password
            <br />
            <input className="form__input" type="password" name="password" placeholder="Password" required />
          </label>
          <br />
          <Checkbox checked className="form__checkbox">
            I agree to the processing of my personal information
          </Checkbox>
          <br />
          <Button htmlType="submit" className="form__btn" size="large" type="primary">
            Create
          </Button>
          <p className="form__text">
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
