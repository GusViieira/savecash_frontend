<script setup lang="ts" name="WalletsView">
import { onMounted, ref } from 'vue'
import AccountCardView from './detail/AccountCardView.vue'
import { reactive } from 'vue'
import type { Pagination } from '@/models/Pagination'
import type {
  Transactions,
  TransactionResponseModel,
} from '@/models/response/TransactionResponseModel'

import DataTable from '@/components/DataTable.vue'
import CarouselCard from '@/components/CarouselCard.vue'
import AccountService from '@/services/AccountService'
import { userStore as useUserStore } from '@/stores/userStore'
import type AccountResponseModel from '@/models/response/AccountResponseModel'
import AccountData from './detail/AccountData.vue'
import { accountStore as useAccountStore } from '@/stores/accountStore'

const aba = ref(1)

const userStore = useUserStore()
const accountStore = useAccountStore()

const tabs = ref([
  { value: 1, text: 'DADOS DA CONTA' },
  { value: 2, text: 'METAS FINANCEIRAS' },
  { value: 3, text: 'PARTICIPANTES' },
])

const dialog = ref(false)

const headers = [
  {
    key: 'type',
    sortable: true,
    title: 'Tipo',
    align: 'center',
  },
  { key: 'date', title: 'Meta', align: 'center', sortable: true },
  { key: 'description', title: 'Motivo', align: 'right', sortable: false },
  { key: 'categoryDescription', title: 'Progresso', align: 'right', sortable: false },
  { key: 'note', title: 'Valor da meta', sortable: false, align: 'right' },
  { key: 'value', title: 'Valor alcançado', sortable: true, align: 'center' },
  { key: 'actions', title: 'Ações', sortable: false, align: 'center' },
]

interface state {
  items: TransactionResponseModel
  item: Transactions
  pagination: Pagination
  accounts: AccountResponseModel[]
  account: AccountResponseModel
}

const state = reactive<state>({
  items: {} as TransactionResponseModel,
  item: { loading: false } as Transactions,
  pagination: {
    page: 0,
    size: 10,
    totalPage: 0,
  } as Pagination,
  accounts: [],
  account: {} as AccountResponseModel
})

const searchAccounts = async () => {
  try{
    const service = new AccountService.AccountService()
    const response = await service.getAccounts(userStore.idUser)
    state.accounts = response.data.content
  }catch(error){
    console.error(error)
  }
}

onMounted(()=> {
  searchAccounts()
})

const getIndexSlide = (value: number) =>{
 state.account = state.accounts[value]
}

const getInitialIndex = () => {
  return state.accounts.findIndex(account => account.idAccount === accountStore.account.idAccount)
}
</script>

<template>
  <v-card>
    <v-card-title class="bg-lightGrey pa-5">
      <v-row>
        <v-col>
          <v-btn class="button" color="primary" rounded="xl" @click="dialog = true">
            Criar conta <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="px-5">
      <v-col>
        <v-row class="d-none d-md-flex align-center justify-center" justify="center" >
          <v-col cols="12">
            <CarouselCard @index="(v) => getIndexSlide(v)" :atualIndex="getInitialIndex()" v-if="state.accounts.length">
              <div class="card" v-for="(account, index) in state.accounts" :key="index">
                <AccountCardView :account="account" />
              </div>
            </CarouselCard>
          </v-col>
        </v-row>
      </v-col>
      <v-row class="mt-12 px-5">
        <v-col cols="12">
          <v-tabs v-model="aba" color="primary">
            <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
              {{ tab.text }}
            </v-tab>
          </v-tabs>
          <!-- Conteúdo dos formulários, um para cada tab -->
          <div v-if="aba === 1">
            <v-row class="mt-6">
              <v-col cols="12">
                <AccountData :account="state.account"/>
              </v-col>
            </v-row>
          </div>
          <div v-else-if="aba === 2" class="mt-6">
            <data-table
              :headers="headers"
              :items="state.items.transactions"
              :totalPage="state.items.totalPage"
              :size="state.pagination.size"
              :page="state.pagination.page"
            >
            </data-table>
          </div>

          <div v-else-if="aba === 3">
            <!-- Campos do formulário para PARTICIPANTES -->
            <v-row class="mt-6">
              <v-col cols="12" sm="12" md="6" lg="3">
                <!-- Campos do formulário para DADOS DA CONTA -->
                <v-text-field
                  label="Nome do participante"
                  variant="solo-filled"
                  density="compact"
                />
              </v-col>
              <v-col>
                <v-text-field
                  label="E-mail do participante"
                  variant="solo-filled"
                  density="compact"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="2">
                <v-text-field label="Tipo de acesso" variant="solo-filled" density="compact" />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="1">
                <v-icon> mdi-pencil-outline </v-icon>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="1">
                <v-icon> mdi-delete-outline </v-icon>
              </v-col>
              <v-col>
                <v-icon label="Tipo de acesso" variant="solo-filled" density="compact" />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" max-width="600" />
</template>
<style scoped>
</style>
