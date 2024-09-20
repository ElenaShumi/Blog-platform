import './createArticle.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectorToken } from '../../store/authenticationSlice'
import { fetchCreateArticle } from '../../store/articlesSlice'
import ArticleTemplate from '../articleTemplate/articleTemplate'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectorToken)

  const onSubmit = (data) => {
    dispatch(fetchCreateArticle({ token, ...data }))
    navigate('/articles')
  }

  return (
    <div className="main">
      <ArticleTemplate title={'Create new article'} onSubmit={onSubmit} />
    </div>
  )
}

export default CreateArticle
