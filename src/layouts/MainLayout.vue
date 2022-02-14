<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>

      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />

      <main class="app-content " :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <Button />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar"
import Sidebar from "@/components/app/Sidebar"
import Button from "@/components/app/Button"
import Loader from '../components/app/Loader.vue'
import messages from "@/utils/messages"

export default {
  name: "main-layout",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar,
    Button,
    Loader
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Something wrong.')
    }
  }
}
</script>