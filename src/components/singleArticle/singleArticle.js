import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { useState } from 'react'

import './singleArticle.scss'

import { fetchDeleteArticle, fetchFavoriteAnArticle } from '../../store/articlesSlice'
import { selectorToken } from '../../store/authenticationSlice'

const SingleArticle = ({ article, singleArticle, authorizedUser }) => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector(selectorToken)
  const [favorited, setFavorited] = useState(article.favorited)
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)

  const truncateOverview = (str = 0, num) => {
    return str.length > num ? str.slice(0, str.indexOf('', num)) + '…' : str
  }

  const tags = article?.tagList?.map((tag, index) => {
    if (tag === null) return null
    let tagCount = 7

    if (singleArticle) tagCount = article.tagList.length

    if (index < tagCount) {
      return (
        <li key={index} className="article-item__tag">
          {singleArticle ? tag : truncateOverview(tag, article.tagList.length < 5 ? 20 : 7)}
        </li>
      )
    }
  })

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle({ token, slug }))
    navigate('/articles', { state: { from: location } })
  }

  const putLike = (slug) => {
    if (token) {
      setFavorited(!favorited)
      setFavoritesCount(favoritesCount + (favorited ? -1 : 1))
      dispatch(fetchFavoriteAnArticle({ token, slug, favorited }))
    }
  }

  return (
    <>
      <div className="article-item__group-1">
        {singleArticle ? (
          <h3 className="article-item__title">{article.title}</h3>
        ) : (
          <Link key={article.slug} to={`/articles/${article.slug}`}>
            <h3 className="article-item__title">{article.title}</h3>
          </Link>
        )}
        <button className="article-item__likes" onClick={() => putLike(article.slug)}>
          {favorited ? (
            <HeartFilled key={article.slug} className="likes-icon likes-icon--favorite" />
          ) : (
            <HeartOutlined key={article.slug} className="likes-icon" />
          )}
          <div>{favoritesCount}</div>
        </button>
      </div>
      <ul className="article-item__tags-list">{tags}</ul>
      <p className="article-item__description">
        {singleArticle ? article.description : truncateOverview(article.description, 120)}
      </p>
      <div className="article-item__group-2">
        <h3 className="article-item__name">{article.author.username}</h3>
        <p className="article-item__date">{format(article.createdAt, 'MMMM d, yyyy')}</p>
      </div>
      <img className="article-item__avatar" src={article.author.image} alt="avatar" />
      {singleArticle && article.author.username === authorizedUser ? (
        <>
          <Popconfirm
            placement="rightTop"
            description="Are you sure to delete this article?"
            onConfirm={deleteArticle}
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="article-item__btn article-item__btn--delete">
              Delete
            </Button>
          </Popconfirm>
          <Button
            className="article-item__btn article-item__btn--edit"
            onClick={() => navigate(`/articles/${slug}/edit`)}
          >
            Edit
          </Button>
        </>
      ) : null}
    </>
  )
}

export default SingleArticle
