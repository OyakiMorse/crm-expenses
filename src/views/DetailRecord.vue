<template>
    <div>
      <Loader v-if="loading"/>
      <div v-else-if="record">
        <div class="breadcrumb-wrap">
          <router-link to="/history" @click.prevent class="breadcrumb">History</router-link>
          <a @click.prevent class="breadcrumb">
            {{record.type === 'income' ? 'Income' : 'Consumption'}}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div 
              class="card" 
              :class="{
                'red': record.type === 'outcome',
                'green': record.type === 'income'
              }"
            >
              <div class="card-content white-text">
                <p> 
                  <strong class="card-content__title" >Description:</strong> 
                  {{record.description}} 
                </p>
                <p> 
                  <strong class="card-content__title">Amount:</strong> 
                  {{record.amount | currency}} 
                </p>
                <p> 
                  <strong class="card-content__title">Category:</strong> 
                  {{record.categoryName}} 
                </p>
                <small class="card-content__date">{{record.date | date('datetime')}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="center not-found" v-else> Record with this id = <strong>{{$route.params.id}}</strong> not found</p>
    </div> 


</template>

<script>
export default {
  name: 'detail-record',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)


    this.record = {
      ...record,
      catgoryName: category.title
    }
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb-wrap {
    cursor: pointer;
  }
  .not-found {
    display: flex;
    justify-content: center;
    text-align: center;
    color: #333A4A;
    padding: 1rem 1rem;
    background-color: #FFAA00;
    font-weight: 600;
    font-size: 1.2rem;
    strong {
      color: #F96200;
      margin: 0 0.4rem;
    }
  }
  .card {
    padding: 1rem;
    &-content {
      &__title {
        margin-top: 0.5rem;
        margin-right: .3rem;
        font-size: 1.2rem;
      }
      &__date {
        display: block;
        font-size: 1rem;
        margin-top: 1rem;
        font-weight: 600;
      }
    }
  
  }
</style>

