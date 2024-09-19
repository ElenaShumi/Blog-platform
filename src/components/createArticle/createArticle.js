import { Button } from 'antd'
import './createArticle.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useFieldArray } from 'react-hook-form'

import { selectorToken } from '../../store/authenticationSlice'
import { fetchCreateArticle } from '../../store/articlesSlice'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectorToken)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (data) => {
    dispatch(fetchCreateArticle({ token, ...data }))
    navigate('/articles')
  }

  const elementsTags = fields.map((tag, idx) => {
    return (
      <li className="form__input-tags" key={tag.id}>
        <input
          className={errors?.tagList ? 'form__input input-tag error' : 'form__input input-tag'}
          placeholder="Tag"
          defaultValue={tag[idx]}
          {...register(`tagList.${idx}`)}
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
              className={errors?.body ? 'form__input error' : 'form__input'}
              rows={5}
              placeholder="Text"
              {...register('body', { required: 'The field must be filled in' })}
            />
          </label>
          <br />
          <div className="form__error">{errors?.body && <p>{errors?.body?.message}</p>}</div>
          <label className="form__label">
            Tags
            <br />
            {fields.length === 0 ? (
              <div className="form__input-tags">
                <input
                  className={errors?.tagList ? 'form__input input-tag error' : 'form__input input-tag'}
                  placeholder="Tag"
                  {...register('tagList')}
                />
                <Button type="primary" ghost className="btn-tag" onClick={() => append(watch('tagList'))}>
                  Add tag
                </Button>
              </div>
            ) : (
              <ul className="form__list-tags">{elementsTags}</ul>
            )}
          </label>
          <div className="form__error">{errors?.tagList && <p>{errors?.tagList?.message}</p>}</div>
          <Button htmlType="submit" className="form__btn new-article__btn" size="large" type="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateArticle
