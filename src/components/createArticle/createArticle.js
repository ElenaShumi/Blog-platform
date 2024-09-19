import { Button } from 'antd'
import './createArticle.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'

import { fetchUpdateUser, selectorToken, selectorUsername, selectorEmail } from '../../store/authenticationSlice'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectorToken)
  const userName = useSelector(selectorUsername)
  const userEmail = useSelector(selectorEmail)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: userName,
      email: userEmail,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data) => {
    const user = {}

    for (let key in data) {
      if (data[key]) user[key] = data[key]
    }

    dispatch(fetchUpdateUser({ token, ...user }))
    navigate('/articles')
  }

  const elementsTags = fields.map((tag, idx) => {
    return (
      <li className="form__input-tags" key={tag.id}>
        <input
          className={errors?.tags ? 'form__input input-tag error' : 'form__input input-tag'}
          placeholder="Tag"
          defaultValue={tag[idx]}
          {...register(`tags.${idx}`)}
        />
        <Button type="primary" danger ghost className="btn-tag" onClick={() => remove(idx)}>
          Delete
        </Button>
        {idx === fields.length - 1 ? (
          <Button type="primary" ghost className="btn-tag" onClick={() => append('')}>
            Add tag
          </Button>
        ) : null}
      </li>
    )
  })

  return (
    <div className="main">
      <div className="new-article__container container">
        <h2 className="container__title">Create new article</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="container__form form">
          <label className="form__label">
            Title
            <br />
            <input
              className={errors?.title ? 'form__input error' : 'form__input'}
              placeholder="Title"
              {...register('title', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.title && <p>{errors?.title?.message}</p>}</div>
          <label className="form__label">
            Short description
            <br />
            <input
              className={errors?.description ? 'form__input error' : 'form__input'}
              placeholder="Title"
              {...register('description', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.description && <p>{errors?.description?.message}</p>}</div>
          <label className="form__label">
            Text
            <br />
            <textarea
              className={errors?.text ? 'form__input error' : 'form__input'}
              rows={5}
              placeholder="Text"
              {...register('text', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.text && <p>{errors?.text?.message}</p>}</div>
          <label className="form__label">
            Tags
            <br />
            {fields.length === 0 ? (
              <div className="form__input-tags">
                <input
                  className={errors?.tags ? 'form__input input-tag error' : 'form__input input-tag'}
                  placeholder="Tag"
                  {...register('tags')}
                />
                <Button type="primary" ghost className="btn-tag" onClick={() => append(watch('tags'))}>
                  Add tag
                </Button>
              </div>
            ) : (
              <ul className="form__list-tags">{elementsTags}</ul>
            )}
          </label>
          <div className="form__error">{errors?.tags && <p>{errors?.tags?.message}</p>}</div>
          <Button htmlType="submit" className="form__btn new-article__btn" size="large" type="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateArticle
