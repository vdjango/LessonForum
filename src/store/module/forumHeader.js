
export default {
  namespaced: true,
  state: {
    article: {
      createId: null
    }
  },
  mutations: {
    /* 创建文章时 设置文章ID 根据文章ID创建文章 图片等 */
    setArticleId: function (state, cid) {
      state.article.createId = cid
    }
  },
  actions: {},
  getters: {
    getArticleId: function (state) {
      return state.article.createId
    },
  }
}
