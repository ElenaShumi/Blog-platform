import { Checkbox, Button } from 'antd'
import './signUp.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'

import { fetchRegisterUser, selectorErrors, selectorToken } from '../../store/authenticationSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const authentication = useSelector(selectorToken)
  const errorsAuthen = useSelector(selectorErrors)
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = ({ username, email, password }) => {
    dispatch(fetchRegisterUser({ username, email, password }))
  }

  useEffect(() => {
    if (authentication) return navigate('/articles', { state: { from: location } })
  }, [authentication])

  return (
    <div className="main">
      <div className="sign-up__container container">
        <h2 className="container__title">Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container__form form">
          <label className="form__label">
            Username
            <br />
            <input
              className={errors?.username ? 'form__input error' : 'form__input'}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'The field must be filled in',
                minLength: { value: 3, message: 'Your password needs to be at least 3 characters' },
                maxLength: { value: 20, message: 'Your password must contain less than 20 characters' },
              })}
            />
          </label>
          <br />
          <div className="form__error">
            {(errors?.username && <p>{errors?.username?.message}</p>) ||
              (errorsAuthen?.username && <p>Username {errorsAuthen?.username}</p>)}
          </div>
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
          <div className="form__error">
            {(errors?.email && <p>{errors?.email?.message}</p>) ||
              (errorsAuthen?.email && <p>Email {errorsAuthen?.email}</p>)}
          </div>
          <label className="form__label">
            Password
            <br />
            <input
              className={errors?.password ? 'form__input error' : 'form__input'}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'The field must be filled in',
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
                maxLength: { value: 40, message: 'Your password must contain less than 40 characters' },
              })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.password && <p>{errors?.password?.message}</p>}</div>
          <label className="form__label">
            Repeat Password
            <br />
            <input
              className={errors?.repeatPassword ? 'form__input error' : 'form__input'}
              type="password"
              placeholder="Password"
              {...register('repeatPassword', {
                required: 'The field must be filled in',
                validate: (data) => data === watch('password') || 'Passwords must match',
              })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.repeatPassword && <p>{errors?.repeatPassword?.message}</p>}</div>
          <Controller
            control={control}
            name="checkbox"
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <Checkbox className="form__checkbox" checked={value} onChange={(e) => onChange(e.target.checked)}>
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
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
