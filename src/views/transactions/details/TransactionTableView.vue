<script setup lang="ts">
import BalancesCards from '@/components/BalancesCards.vue'
import DataTable from '@/components/DataTable.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { Pagination } from '@/models/Pagination'
import type { UpdateTransactionRequestModel } from '@/models/request/UpdateTransactionRequestModel'
import type {
  TransactionDTO,
  TransactionResponseModel,
} from '@/models/response/TransactionResponseModel'
import TransactionsService from '@/services/TransactionsService'
import { userStore } from '@/stores/userStore'
import { onMounted, reactive, ref, watch } from 'vue'
import { PAID, PENDING } from '@/utils/constants'
import TransactionModalView from './TransactionModalView.vue'
import AlertCard from '@/components/AlertCard.vue'
import { accountStore as useAccountStore } from '@/stores/accountStore'

const aba = ref()

const store = userStore()
const accountStore = useAccountStore()

const monted = ref(false)
const loading = ref(false)
const dialog = ref(false)
const deleteAlert = ref(false)

const props = defineProps<{
  updateView?: boolean
}>()

watch(
  () => props.updateView,
  (newValue) => {
    if (newValue) {
      search(state.pagination)
    }
  },
)

interface state {
  items: TransactionResponseModel
  item: TransactionDTO
  pagination: Pagination
}

const state = reactive<state>({
  items: {} as TransactionResponseModel,
  item: { loading: false } as TransactionDTO,
  pagination: {
    page: 0,
    size: 10,
    totalPage: 0,
  } as Pagination,
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
    sortable: true,
    title: 'Tipo',
    align: 'center',
  },
  { key: 'date', title: 'Data de vencimento', align: 'center', sortable: true },
  { key: 'description', title: 'Descrição', align: 'right', sortable: false },
  { key: 'categoryDescription', title: 'Categoria', align: 'right', sortable: false },
  { key: 'note', title: 'Anotação', sortable: false, align: 'right' },
  { key: 'value', title: 'Valor', sortable: true, align: 'center' },
  { key: 'status', title: 'Status', sortable: true, align: 'center' },
  { key: 'actions', title: 'Ações', sortable: false, align: 'center' },
]

const search = async (pagination: Pagination) => {
  try {
    loading.value = true
    const service = new TransactionsService.Transactions()
    const response = await service.getTransaction(
      store.idUser,
      accountStore.account.idAccount,
      aba.value,
      pagination.page,
      pagination.size
    )
    if (response.data.content) {
      state.items = response.data.content
    }
    monted.value = true
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

const submit = async (item: TransactionDTO, isChip: boolean) => {
  try {
    if (isChip) {
      state.items.transactionDTO.forEach((transaction) => {
        if (transaction.id === item.id) {
          transaction.loading = true
        }
        return transaction
      })
    }

    const update = handleUpdateTransaction(item)
    console.log(update)
    const service = new TransactionsService.Transactions()
    await service.updateTransaction(update)
    search(state.pagination)
    state.item.loading = false
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleUpdateTransaction = (item: TransactionDTO): UpdateTransactionRequestModel => {
  return {
    id: item.id,
    type: item.type,
    description: item.description,
    idCategory: item.idCategory,
    categoryDescription: item.categoryDescription,
    date: item.date,
    value: item.value,
    note: item.note,
    status: item.status === PENDING ? PAID : PENDING,
    idUser: item.idUser,
    isRecurrent: item.isRecurrent,
    idAccount: item.idAccount
  }
}

const update = (item: TransactionDTO) => {
  state.item = item
  dialog.value = true
}

const deleteItem = (item: TransactionDTO) => {
  state.item = item
  deleteAlert.value = true
}

const deleteTransaction = async (item: TransactionDTO) => {
  try {
    const service = new TransactionsService.Transactions()
    await service.deleteTransaction(item.id)
    search(state.pagination)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  const today = new Date()
  const atualMonth = today.getMonth() + 1
  aba.value = atualMonth
  search(state.pagination)
  console.log(accountStore.account)
})
</script>
<template>
  <LoadingComponent :value="loading" />
    <v-tabs align-tabs="center" v-model="aba" color="primary">
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        @click="search(state.pagination)"
      >
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
              <DataTable
                :headers="headers"
                :items="state.items.transactionDTO"
                :totalPage="state.items.totalPage"
                :size="state.pagination.size"
                :page="state.pagination.page"
                @update:page="
                  (v: number) => {
                    state.pagination.page = v
                    search(state.pagination)
                  }
                "
                @edit="(item) => update(item as TransactionDTO)"
                @delete="(item) => deleteItem(item as TransactionDTO)"
              >
                <template v-slot:item.type="{ item }">
                  <v-row>
                    <v-col color="primary" class="align-left">
                      <div class="d-flex align-center">
                        <v-icon :color="parseInt(item.type) === 1 ? 'green' : 'red'">
                          {{ parseInt(item.type) === 1 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                        </v-icon>
                        <span class="ml-2">
                          {{ parseInt(item.type) === 1 ? 'Receita' : 'Despesa' }}
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.date="{ item }">
                  <div class="text-center">
                    {{ new Date(item.date).toLocaleDateString('pt-BR') }}
                  </div>
                </template>
                <template v-slot:item.value="{ item }">
                  {{ item.value?.toLocaleString('pt-BR', { style: 'currency', currency: accountStore.account.currency }) }}
                </template>

                <template v-slot:item.note="{ item }">
                  {{ item.note || '-' }}
                </template>
                <template v-slot:item.status="{ item }">
                  <div class="text-center">
                    <v-chip
                      :color="
                        item.status === PAID ? 'green' : item.status === PENDING ? 'warning' : ''
                      "
                      class="text-uppercase"
                      size="small"
                      label
                      @click="submit(item, true)"
                    >
                      <v-icon
                        v-if="
                          !state.items.transactionDTO.some(
                            (transaction) => transaction.id === item.id && transaction.loading,
                          )
                        "
                        >{{
                          item.status === PAID
                            ? 'mdi-check'
                            : item.status === PENDING
                              ? 'mdi-clock'
                              : ''
                        }}</v-icon
                      >
                      <v-progress-circular
                        v-if="
                          state.items.transactionDTO.some(
                            (transaction) => transaction.id === item.id && transaction.loading,
                          )
                        "
                        color="primary"
                        indeterminate
                        size="20"
                      ></v-progress-circular>
                    </v-chip>
                  </div>
                </template>
              </DataTable>
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  <v-dialog v-model="dialog" max-width="600">
    <TransactionModalView
      :isUpdate="true"
      :item="state.item"
      @close="
        (v: boolean) => {
          dialog = v
          search(state.pagination)
        }
      "
    />
  </v-dialog>
  <AlertCard
    :alert="deleteAlert"
    title="Atenção"
    :text="'Deseja realmente excluir este lançamento ?'"
    @close="(v) => (deleteAlert = v)"
    @confirm:modelValue="
      (v) => {
        deleteAlert = v
        if (v) {
          deleteTransaction(state.item)
        }
      }
    "
  />
</template>
<style scoped>
</style>
