import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Result } from 'antd'
import { useLocation } from 'react-router-dom'

import { fetchArticles, selectorArticles, selectorArticlesCount, selectorStatus } from '../../store/articlesSlice'
import { selectorToken } from '../../store/authenticationSlice'
import SingleArticle from '../singleArticle'

import './articlesList.scss'

export default function ArticlesList() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const location = useLocation()
  const articlesList = useSelector(selectorArticles)
  const articlesCount = useSelector(selectorArticlesCount)
  const status = useSelector(selectorStatus)
  const token = useSelector(selectorToken)
  const fromPage = location.state?.from?.pathname

  useEffect(() => {
    // console.log(username)
    // console.log(articlesList)
    dispatch(fetchArticles({ count: 1, token }))
  }, [dispatch, fromPage])

  let elements = articlesList.map((article) => {
    return (
      <div key={article.slug} className="article-item article-item--min">
        <SingleArticle article={article} />
      </div>
    )
  })
  // console.log(articlesList)
  const onChangePages = (page) => {
    setPage(page)

    dispatch(fetchArticles({ count: page * 5 - 5, token }))
  }

  return (
    <>
      <ul className="list-articles">
        {status === 'rejected' ? (
          <Result status="error" title="Sorry, something went wrong." />
        ) : (
          <Spin wrapperClassName="list-articles__spinner" tip="Loading" size="large" spinning={status === 'loading'}>
            {elements}
          </Spin>
        )}
      </ul>
      <Pagination total={articlesCount} pageSize={5} showSizeChanger={false} onChange={onChangePages} current={page} />
    </>
  )
}
