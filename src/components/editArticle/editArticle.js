import './editArticle.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectorToken } from '../../store/authenticationSlice'
import { fetchUpdateArticle, selectorSingleArticle } from '../../store/articlesSlice'
import ArticleTemplate from '../articleTemplate/articleTemplate'

const EditArticle = () => {
  const { slug } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectorToken)
  const currentArticle = useSelector(selectorSingleArticle)

  const onSubmit = (data) => {
    dispatch(fetchUpdateArticle({ token, slug, ...data }))
    navigate(`/articles/${slug}`, { state: { from: location } })
  }
  console.log(currentArticle)
  console.log(slug)
  return (
    <div className="main">
      <ArticleTemplate title={'Edit article'} onSubmit={onSubmit} currentArticle={currentArticle} />
    </div>
  )
}

export default EditArticle
