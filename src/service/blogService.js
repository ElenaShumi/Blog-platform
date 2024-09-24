export default class BlogService {
  static _apiBase = 'https://blog.kata.academy/api'

  static async #fetchRequest(url, obj = {}) {
    const response = await fetch(url, obj)

    if (!response.ok) {
      throw new Error('Server Error!')
    }

    const data = await response.json()

    return data
  }

  static async getArticles(count) {
    return await this.#fetchRequest(`${this._apiBase}/articles?limit=5&offset=${count}`)
  }

  static async getSingleArticle(slug) {
    return await this.#fetchRequest(`${this._apiBase}/articles/${slug}`)
  }

  static async postNewUser(user) {
    return await this.#fetchRequest(`${this._apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
      }),
    })
  }

  static async postLoginUser(user) {
    return await this.#fetchRequest(`${this._apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
      }),
    })
  }

  static async getCurrentUser(token) {
    return await this.#fetchRequest(`${this._apiBase}/user`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static async updateCurrentUser({ token, ...rest }) {
    return await this.#fetchRequest(`${this._apiBase}/user`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: rest,
      }),
    })
  }

  static async createAnArticle({ token, ...rest }) {
    return await this.#fetchRequest(`${this._apiBase}/articles`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article: rest,
      }),
    })
  }

  static async updateAnArticle({ token, slug, ...rest }) {
    return await this.#fetchRequest(`${this._apiBase}/articles/${slug}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article: rest,
      }),
    })
  }

  static async deleteAnArticle({ token, slug }) {
    return await this.#fetchRequest(`${this._apiBase}/articles/${slug}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}
