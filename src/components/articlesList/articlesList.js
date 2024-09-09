import { Pagination } from 'antd'

import ArticleItem from '../articleItem'

import './articlesList.scss'

export default function ArticlesList() {
  return (
    <>
      <ul className="list-articles">
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
        <ArticleItem />
      </ul>
      <Pagination defaultCurrent={1} total={50} />
    </>
  )
}
