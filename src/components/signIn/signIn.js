import { Button } from 'antd'
import './signIn.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { fetchLoginUser, selectorErrors, selectorToken } from '../../store/authenticationSlice'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const authentication = useSelector(selectorToken)
  const errorsAuthen = useSelector(selectorErrors)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const fromPage = location.state?.from?.pathname || '/articles'

  const onSubmit = ({ email, password }) => {
    dispatch(fetchLoginUser({ email, password }))
  }

  useEffect(() => {
    if (authentication) return navigate(fromPage, { state: { from: location } })
  }, [authentication])

  return (
    <div className="main sign-in">
      <div className="sign-in__container container">
        <h2 className="container__title">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container__form form">
          <label className="form__label">
            Email address
            <br />
            <input
              className={errors?.email ? 'form__input error' : 'form__input'}
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'The field must be filled in',
                pattern: {
                  value:
                    /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
                  message: 'Must be a valid mailing address',
                },
              })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.email && <p>{errors?.email?.message}</p>}</div>
          <label className="form__label">
            Password
            <br />
            <input
              className={errors?.password ? 'form__input error' : 'form__input'}
              type="password"
              placeholder="Password"
              {...register('password', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">
            {(errors?.password && <p>{errors?.password?.message}</p>) ||
              (errorsAuthen?.['email or password'] && <p>Email or password {errorsAuthen?.['email or password']}</p>)}
          </div>
          <Button htmlType="submit" className="form__btn" size="large" type="primary">
            Login
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
