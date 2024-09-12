import { format } from 'date-fns'
import { HeartOutlined } from '@ant-design/icons'

import './singleArticle.scss'

const SingleArticle = ({ article, singleArticle }) => {
  const truncateOverview = (str = 0, num) => {
    return str.length > num ? str.slice(0, str.indexOf('', num)) + '…' : str
  }

  const tags = article.tagList.map((tag, index) => {
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

  return (
    <>
      <div className="article-item__group-1">
        <h3 className="article-item__title">{singleArticle ? article.title : truncateOverview(article.title, 40)}</h3>
        <div className="article-item__likes">
          <HeartOutlined className="article-item__likes-icon" />
          <div>{article.favoritesCount}</div>
        </div>
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
    </>
  )
}

export default SingleArticle
