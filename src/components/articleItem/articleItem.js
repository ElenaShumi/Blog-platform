import './articleItem.scss'

import imageAvatar from './Rectangle 1.png'

export default function ArticleItem() {
  return (
    <li className="article-item">
      <h3 className="article-item__title">Some article title</h3>
      <div className="article-item__likes">
        <div className="article-item__heart">♡</div>
        <div>12</div>
      </div>
      <code className="article-item__tag">Tag1</code>
      <p className="article-item__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
      <h3 className="article-item__name">John Doe</h3>
      <p className="article-item__date">March 5, 2020</p>
      <img className="article-item__avatar" src={imageAvatar} alt="avatar" />
    </li>
  )
}
