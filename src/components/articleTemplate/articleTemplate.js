import { Button } from 'antd'
import './articleTemplate.scss'
import { useForm, useFieldArray } from 'react-hook-form'

const ArticleTemplate = ({ title, onSubmit, currentArticle }) => {
  const defaultTagList =
    currentArticle?.tagList.length === 0 ? [{ tag: '' }] : currentArticle?.tagList.map((elem) => ({ tag: elem }))
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      title: currentArticle?.title,
      description: currentArticle?.description,
      body: currentArticle?.body,
      tagList: defaultTagList || [{ tag: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <div className="new-article__container container">
      <h2 className="container__title">{title}</h2>
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
          <div className="form__tags">
            <ul className="form__list-tags">
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <li className="form__input-tags">
                      <input
                        className={errors?.tagList?.[index] ? 'form__input input-tag error' : 'form__input input-tag'}
                        placeholder="Tag"
                        defaultValue={field[index]}
                        {...register(`tagList.${index}.tag`, {
                          required: 'The field must be filled in',
                          validate: (value) => !value.match(/^[ ]+$/) || 'The field should not contain only spaces',
                        })}
                      />
                      {fields.length !== 1 ? (
                        <Button
                          htmlType="button"
                          type="primary"
                          danger
                          ghost
                          className="btn-tag"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </li>
                    <div className="form__error">
                      {errors?.tagList?.[index] && (
                        <p className="form__error--tags">{errors?.tagList?.[index]?.tag.message}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </ul>
            <Button
              htmlType="button"
              type="primary"
              ghost
              className="btn-tag form__add-tag"
              onClick={() => append({ tag: '' })}
            >
              Add tag
            </Button>
          </div>
        </label>
        <div className="form__error">{errors?.tagList && <p>{errors?.tagList?.message}</p>}</div>
        <Button htmlType="submit" className="form__btn new-article__btn" size="large" type="primary">
          Send
        </Button>
      </form>
    </div>
  )
}

export default ArticleTemplate
