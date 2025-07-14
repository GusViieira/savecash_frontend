import { ref } from 'vue'
import { defineStore } from 'pinia'
import type AccountResponseModel from '@/models/response/AccountResponseModel'

export const accountStore = defineStore(
  'account',
  () => {
    const account = ref({} as AccountResponseModel)


    return { account }
  },
  {
  persist: true,
})
