import { Button } from 'antd'
import './profile.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { fetchUpdateUser, selectorToken, selectorUsername, selectorEmail } from '../../store/authenticationSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector(selectorToken)
  const userName = useSelector(selectorUsername)
  const userEmail = useSelector(selectorEmail)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: userName,
      email: userEmail,
    },
  })

  const onSubmit = (data) => {
    const user = {}

    for (let key in data) {
      if (data[key]) user[key] = data[key]
    }

    dispatch(fetchUpdateUser({ token, ...user }))
    navigate('/articles', { state: { from: location } })
  }

  return (
    <div className="main">
      <div className="profile__container container">
        <h2 className="container__title">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container__form form">
          <label className="form__label">
            Username
            <br />
            <input
              className={errors?.username ? 'form__input error' : 'form__input'}
              type="text"
              placeholder="Username"
              {...register('username', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.username && <p>{errors?.username?.message}</p>}</div>
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
            New password
            <br />
            <input
              className={errors?.password ? 'form__input error' : 'form__input'}
              type="password"
              placeholder="Password"
              {...register('password', {
                minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
                maxLength: { value: 40, message: 'Your password must contain less than 40 characters' },
              })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.password && <p>{errors?.password?.message}</p>}</div>
          <label className="form__label">
            Avatar image (url)
            <br />
            <input
              className={errors?.image ? 'form__input error' : 'form__input'}
              type="url"
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'The url must be correct',
                },
              })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.image && <p>{errors?.image?.message}</p>}</div>
          <Button htmlType="submit" className="form__btn" size="large" type="primary">
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile
