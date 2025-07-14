import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const idUser = ref()
  const name = ref('')
  const email = ref('')

  return { idUser, name, email }
}, {
  persist: true,
})
