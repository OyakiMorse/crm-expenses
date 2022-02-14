import _ from 'lodash'
export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: null,
      allItemS: [],
      items: []
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItemS[page - 1] || this.allItemS[0]
    },
    setupPagination(allItemS) {
      this.allItemS = _.chunk(allItemS, this.pageSize)
      this.pageCount = _.size(this.allItemS)
      this.items = this.allItemS[this.page - 1] || this.allItemS[0]
    }
  }
}