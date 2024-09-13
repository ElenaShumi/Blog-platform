export default class BlogService {
  static _apiBase = 'https://blog.kata.academy/api'

  static async #fetchRequest(request) {
    const response = await request

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()

    return data
  }

  static getArticles(count) {
    this.#fetchRequest(fetch(`${this._apiBase}/articles?limit=5&offset=${count}`))
  }

  static getSingleArticle(slug) {
    this.#fetchRequest(fetch(`${this._apiBase}/articles/${slug}`))
  }

  static postNewUser(user) {
    this.#fetchRequest(
      fetch(`${this._apiBase}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
        }),
      })
    )
  }

  static postLoginUser(user) {
    this.#fetchRequest(
      fetch(`${this._apiBase}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
        }),
      })
    )
  }
}
