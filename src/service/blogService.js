export default class BlogService {
  static _apiBase = 'https://blog.kata.academy/api/articles'

  static async getArticles(count) {
    const response = await fetch(`${this._apiBase}?limit=5&offset=${count}`)

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()

    return data
  }

  static async getSingleArticle(slug) {
    const response = await fetch(`${this._apiBase}/${slug}`)

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()

    return data
  }
}
