import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore(
  'user',
  () => {
    const name = ref('')
    const email = ref('')

    return { name, email }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
