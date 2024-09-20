import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { HeartOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

import './singleArticle.scss'

const SingleArticle = ({ article, singleArticle, authorizedUser }) => {
  const { slug } = useParams()
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
      {singleArticle && article.author.username === authorizedUser ? (
        <>
          <Popconfirm
            placement="rightTop"
            description="Are you sure to delete this article?"
            okText="Yes"
            cancelText="No"
          >
            <Button danger className="article-item__btn article-item__btn--delete">
              Delete
            </Button>
          </Popconfirm>
          <Link to={`/articles/${slug}/edit`}>
            <Button className="article-item__btn article-item__btn--edit">Edit</Button>
          </Link>
        </>
      ) : null}
    </>
  )
}

export default SingleArticle
