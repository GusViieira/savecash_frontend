import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('counter', () => {
  const name = ref('')
  const email = ref('')

  return { name, email }
})
