<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

        <form @submit.prevent="submitHandler">
          <div class="input-field" >
            <select ref="select" v-model="current">
              <option
                v-for="c of categories"
                :key="c.id"
                :value="c.id"
              >{{c.title}}
              </option>
            </select>
            <label>Choose category</label>
          </div>

          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
            >
            <label for="name">Title</label>
            <span 
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >
              Input title of category
            </span>
          </div>

          <div class="input-field">
            <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            >
            <label for="limit">Limit</label>
            <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >
              Input min value {{$v.limit.$params.minValue.min}}
            </span>
         </div>

          <button class="btn waves-effect waves-light" type="submit">
            Refersh
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: null,
    limit: 100,
    current: null,
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  watch: {
    current(catId) {
      const {limit, title} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit 
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit 
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$msg('Category was updated')
        this.$emit('updated', categoryData)
      } catch (e) {
        
      }
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    setTimeout(() => {
      M.updateTextFields()
    },0)
  },
  beforeDestroy() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>