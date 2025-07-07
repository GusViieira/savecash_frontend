<script setup lang="ts">
import BalancesCards from '@/components/BalancesCards.vue'
import DataTable from '@/components/DataTable.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { TransactionResponseModel } from '@/models/response/TransactionResponseModel'
import TransactionsService from '@/services/TransactionsService'
import { userStore } from '@/stores/userStore'
import { onMounted, reactive, ref } from 'vue'

const aba = ref()

const store = userStore()
const monted = ref(false)
const loading = ref(false)

interface state {
  items: TransactionResponseModel
}

const state = reactive<state>({
  items: {} as TransactionResponseModel,
})

const tabs = ref([
  { value: 1, text: 'Janeiro' },
  { value: 2, text: 'Fevereiro' },
  { value: 3, text: 'Março' },
  { value: 4, text: 'Abril' },
  { value: 5, text: 'Maio' },
  { value: 6, text: 'Junho' },
  { value: 7, text: 'Julho' },
  { value: 8, text: 'Agosto' },
  { value: 9, text: 'Setembro' },
  { value: 10, text: 'Outubro' },
  { value: 11, text: 'Novembro' },
  { value: 12, text: 'Dezembro' },
])

const headers = [
  {
    key: 'type',
    sortable: false,
    title: 'Tipo',
  },
  { key: 'description', title: 'Descrição', sortable: false },
  { key: 'category', title: 'Categoria', sortable: false },
  { key: 'date', title: 'Data de vencimento' },
  { key: 'value', title: 'Valor' },
  { key: 'note', title: 'Anotação', sortable: false },
  { key: 'status', title: 'Status' },
  { key: 'actions', title: 'Ações', sortable: false },
]

const search = async () => {
  try {
    loading.value = true
    const service = new TransactionsService.Transactions()
    const response = await service.getTransaction(store.idUser, aba.value)
    if (response.data.content) {
      state.items = response.data.content
    }
    monted.value = true
    loading.value = false
  } catch (error) {
    console.error('Error fetching transactions:', error)
  }
}

onMounted(() => {
  const today = new Date()
  const atualMonth = today.getMonth() + 1
  aba.value = atualMonth
  search()
})
</script>
<template>
  <LoadingComponent :value="loading" />
  <v-tabs v-model="aba" color="primary">
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" @click="search">
      {{ tab.text }}
    </v-tab>
  </v-tabs>

  <v-card-text v-if="monted">
    <v-tabs-window v-model="aba">
      <v-tabs-window-item :value="aba">
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="4">
            <BalancesCards :title="'Receitas'" :value="state.items.revenue" />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <BalancesCards :title="'Despesas'" :value="state.items.expense" />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <BalancesCards :title="'Saldo final'" :value="state.items.finalBalance" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <DataTable :headers="headers" :items="state.items.transactionDTO">
              <template v-slot:item.type="{ item }">
                {{ parseInt(item.type) === 1 ? 'Receita' : 'Despesa' }}
              </template>
              <template v-slot:item.date="{ item }">
                {{ new Date(item.date).toLocaleDateString('pt-BR') }}
              </template>
              <template v-slot:item.value="{ item }">
                {{ item.value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </template>
              <template v-slot:item.note="{ item }">
                {{ item.note || '-' }}
              </template>
            </DataTable>
          </v-col>
        </v-row>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>
</template>
