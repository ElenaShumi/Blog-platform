import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Result } from 'antd'
import { Link } from 'react-router-dom'

import ArticleItem from '../articleItem'
import { fetchArticles, selectorArticles, selectorArticlesCount, selectorStatus } from '../../store/articlesSlice'

import './articlesList.scss'

export default function ArticlesList() {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const articlesList = useSelector(selectorArticles)
  const articlesCount = useSelector(selectorArticlesCount)
  const status = useSelector(selectorStatus)

  useEffect(() => {
    dispatch(fetchArticles())

    // if (articlesList.length === 0) console.log(articlesList)
  }, [dispatch])

  let elements = articlesList.map((article) => {
    return (
      <Link key={article.slug} to={`/articles/${article.slug}`}>
        <ArticleItem article={article} />
      </Link>
    )
  })

  const onChangePages = (page) => {
    setPage(page)
    dispatch(fetchArticles(page * 5 - 5))
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
