import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './articleItem.scss'

import SingleArticle from '../singleArticle'
import { fetchSingleArticle, selectorSingleArticle } from '../../store/articlesSlice'
import { selectorToken, selectorUsername } from '../../store/authenticationSlice'

export default function ArticleItem() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector(selectorSingleArticle)
  const authorizedUser = useSelector(selectorUsername)
  const token = useSelector(selectorToken)

  useEffect(() => {
    dispatch(fetchSingleArticle({ slug, token }))
  }, [slug])

  return (
    <div className="main">
      {article && (
        <div className="item--flex">
          <div className="article-item article-item--max">
            <SingleArticle article={article} singleArticle={true} authorizedUser={authorizedUser} />
          </div>
          <Markdown remarkPlugins={[remarkGfm]} className="article-item__body">
            {article.body}
          </Markdown>
        </div>
      )}
    </div>
  )
}
