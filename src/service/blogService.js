export default class BlogService {
  static _apiBase = 'https://blog.kata.academy/api'

  static async #fetchRequest(url, obj = {}) {
    const response = await fetch(url, obj)

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()
    // console.log(data)
    return data
  }

  static getArticles(count) {
    return this.#fetchRequest(`${this._apiBase}/articles?limit=5&offset=${count}`)
  }

  static getSingleArticle(slug) {
    return this.#fetchRequest(`${this._apiBase}/articles/${slug}`)
  }

  static postNewUser(user) {
    return this.#fetchRequest(`${this._apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
      }),
    })
  }

  static postLoginUser(user) {
    return this.#fetchRequest(`${this._apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
      }),
    })
  }

  static getCurrentUser(token) {
    return this.#fetchRequest(`${this._apiBase}/user`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static updateCurrentUser({ token, ...rest }) {
    return this.#fetchRequest(`${this._apiBase}/user`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: rest,
      }),
    })
  }
}
