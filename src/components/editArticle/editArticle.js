import './editArticle.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectorToken } from '../../store/authenticationSlice'
import { fetchUpdateArticle, selectorSingleArticle } from '../../store/articlesSlice'
import ArticleTemplate from '../articleTemplate/articleTemplate'

const EditArticle = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectorToken)
  const currentArticle = useSelector(selectorSingleArticle)

  const onSubmit = (data) => {
    dispatch(fetchUpdateArticle({ token, slug, ...data }))
    navigate(`/articles/${slug}`)
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
