import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { HeartOutlined } from '@ant-design/icons'

import './singleArticle.scss'
import { fetchSingleArticle, selectorSingleArticle } from '../../store/articlesSlice'

const SingleArticle = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector(selectorSingleArticle)

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
    console.log(article)
    // if (article === null) return null
  }, [slug])
  // console.log(article)

  const tags = article.tagList.map((tag, index) => {
    if (tag === null) return null
    return (
      <li key={index} className="article-item__tag">
        {tag}
      </li>
    )
  })

  if (article.length === 0) return <div>null</div>

  return (
    <div className="page">
      {article && (
        <div className="article-item">
          <div className="article-item__group-1">
            <h3 className="article-item__title">{article.title}</h3>
            <div className="article-item__likes">
              <HeartOutlined className="article-item__likes-icon" />
              <div>{article.favoritesCount}</div>
            </div>
          </div>
          <ul className="article-item__tags-list">{tags}</ul>
          <p className="article-item__description">{article.description}</p>
          <div className="article-item__group-2">
            <h3 className="article-item__name">{article.author.username}</h3>
            <p className="article-item__date">{format(article.createdAt, 'MMMM d, yyyy')}</p>
          </div>
          <img className="article-item__avatar" src={article.author.image} alt="avatar" />
          <p className="article-item__body">{article.body}</p>
        </div>
      )}
    </div>
  )
}

export default SingleArticle
