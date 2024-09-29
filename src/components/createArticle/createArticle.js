import './createArticle.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectorToken } from '../../store/authenticationSlice'
import { fetchCreateArticle } from '../../store/articlesSlice'
import ArticleTemplate from '../articleTemplate/articleTemplate'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector(selectorToken)

  const onSubmit = ({ tagList, ...data }) => {
    const arrayTag = tagList.map((elements) => elements.tag)
    dispatch(fetchCreateArticle({ token, tagList: arrayTag, ...data }))
    navigate('/articles', { state: { from: location } })
  }

  return (
    <div className="main">
      <ArticleTemplate title={'Create new article'} onSubmit={onSubmit} />
    </div>
  )
}

export default CreateArticle
