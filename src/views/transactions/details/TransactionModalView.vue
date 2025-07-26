<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue'
import ModalPersonalized from '@/components/ModalPersonalized.vue'
import type { CreateTransactionRequestModel } from '@/models/request/CreateTransactionRequestModel'
import type { UpdateTransactionRequestModel } from '@/models/request/UpdateTransactionRequestModel'
import type { CategoryResponseModel } from '@/models/response/CategoryResponseModel'
import CategoryService from '@/services/CategoryService'
import TransactionsService from '@/services/TransactionsService'
import { accountStore as useAccountStore } from '@/stores/accountStore'
import { userStore } from '@/stores/userStore'
import { convertDate, convertDateToServe } from '@/utils/date'
import { onMounted, reactive, ref } from 'vue'

const loading = ref(false)
const alertSucess = ref(false)
const title = ref('Novo Lançamento')
const icon = ref('mdi-bank-transfer')

const store = userStore()
const accountStore = useAccountStore()

const props = defineProps<{
  isUpdate?: boolean
  item?: UpdateTransactionRequestModel
  type: number
}>()

interface state {
  itemsCategory: CategoryResponseModel[]
  createTransaction: CreateTransactionRequestModel
  updateTransaction: UpdateTransactionRequestModel
}

const state = reactive<state>({
  itemsCategory: [],
  createTransaction: {} as CreateTransactionRequestModel,
  updateTransaction: {} as UpdateTransactionRequestModel,
})

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const searchCategories = async () => {
  try {
    const service = new CategoryService.GetCategoryService()
    const response = await service.getCategories(store.idUser)
    state.itemsCategory = response.data.content
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const submit = async () => {
  try {
    loading.value = true
    const service = new TransactionsService.Transactions()
    state.createTransaction.idUser = store.idUser
    state.createTransaction.idAccount = accountStore.account.idAccount
    state.createTransaction.date = convertDateToServe(state.createTransaction.date)
    state.createTransaction.value = parseFloat(
      state.createTransaction.value.toString().replace(',', '.'),
    )
    console.log(state.createTransaction.value)
    const response = await service.createTransaction(state.createTransaction)
    if (response.data.content) {
      alertSucess.value = true
    }
    loading.value = false

    emit('close', false)
  } catch (error) {
    console.error('Error creating transaction:', error)
  }
}

const submitUpdate = async () => {
  try {
    loading.value = true
    const service = new TransactionsService.Transactions()
    fillUpdateTransaction()
    state.updateTransaction.idAccount = accountStore.account.idAccount
    const response = await service.updateTransaction(state.updateTransaction)
    if (response.data.content) {
      alertSucess.value = true
    }
    loading.value = false
    emit('close', false)
  } catch (error) {
    console.error('Error updating transaction:', error)
  }
}

const fillUpdateTransaction = () => {
  state.updateTransaction = {
    ...state.createTransaction,
    date: convertDateToServe(state.createTransaction.date),
  } as UpdateTransactionRequestModel
}

onMounted(() => {
  searchCategories()

  state.createTransaction.type = props.type
  state.updateTransaction.type = props.type

  console.log('Transaction type:', state.createTransaction.type)

  if (state.createTransaction.type === 1) {
    title.value = 'Nova receita'
    icon.value = 'mdi-arrow-up'
  }

  if (state.createTransaction.type === 2) {
    title.value = 'Nova despesa'
    icon.value = 'mdi-arrow-down'
  }

  if (props.isUpdate) {
    console.log('Editing transaction:', props.item)
    state.createTransaction = {
      ...props.item,
      ...(props.item?.date && { date: convertDate(props.item.date) }),
    } as CreateTransactionRequestModel
    title.value = 'Editar Lançamento'
    return
  }
})

const maskOptions = {
  reversed: true,
  preProcess: (val: string) => val.replace(/[R$\s]/g, ''),
  postProcess: (val: string) => {
    if (!val) return ''
    return val.replace('.', ',')
  },
}

const handleClose = (value: boolean) => {
  emit('close', value)
  loading.value = false
  alertSucess.value = false
  state.createTransaction = {} as CreateTransactionRequestModel
  state.updateTransaction = {} as UpdateTransactionRequestModel
}
</script>
<template>
  <LoadingComponent :value="loading" />
  <v-snackbar
    v-model="alertSucess"
    :timeout="4000"
    icon="mdi-check-outline"
    class="mt-10"
    color="success"
    location="top right"
  >
    {{ 'Suas alterações foram salvas com sucesso.' }}
  </v-snackbar>
  <ModalPersonalized :title="title" :icon="icon" width="650" @close="(v) => handleClose(v)">
    <template #default>
      <v-row no-gutters class="mt-3">
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          <v-text-field
            v-model="state.createTransaction.value"
            label="Valor"
            variant="solo-filled"
            density="compact"
            type="text"
            class="mr-2"
            :v-mask="[maskOptions, '9999999999,99']"
            :prefix="
              (0)
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: accountStore.account.currency,
                })
                .replace(/\s?0,00$/, '')
            "
            :rules="[(v) => !!v || 'Valor é obrigatório']"
          />
        </v-col>
        <v-col cols="12" xl="8" lg="8" md="8" sm="12">
          <v-text-field
            v-model="state.createTransaction.description"
            label="Descrição"
            variant="solo-filled"
            density="compact"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          <v-text-field
            v-model="state.createTransaction.date"
            label="Data"
            variant="solo-filled"
            density="compact"
            type="text"
            v-mask="'##/##/####'"
            class="mr-2"
          />
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          <v-select
            v-model="state.createTransaction.idCategory"
            label="Categoria"
            variant="solo-filled"
            density="compact"
            :items="state.itemsCategory"
            item-title="description"
            item-value="id"
            class="mr-2"
          />
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" sm="12">
          <v-select
            v-model="state.createTransaction.status"
            label="Status"
            variant="solo-filled"
            density="compact"
            :items="['Pago', 'Pendente', 'Outro']"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xl="12" lg="12" md="12" sm="12">
          <v-textarea
            v-model="state.createTransaction.note"
            rows="2"
            label="Anotações"
            variant="solo-filled"
            density="compact"
            type="text"
            auto-grow
          />
        </v-col>
      </v-row>
    </template>
    <template #actions>
      <v-row no-gutters align="center" class="mt-n8">
        <v-col cols="12" xl="1" lg="1" md="1" sm="12">
          <v-switch hide-details inset color="primary" />
        </v-col>
        <v-col class="pa-3" cols="12" xl="2" lg="2" md="2" sm="12">
          <span>Recorrente</span>
        </v-col>
        <v-col cols="12" xl="9" lg="9" md="9" sm="12" class="text-end pa-0">
          <v-btn
            v-if="props.isUpdate"
            class="bg-primary"
            color="purple"
            variant="text"
            rounded
            text="Salvar"
            @click="submitUpdate"
          />
          <v-btn
            v-if="!props.isUpdate"
            class="bg-primary"
            color="purple"
            variant="text"
            rounded
            text="Salvar"
            @click="submit"
          />
        </v-col>
      </v-row>
    </template>
  </ModalPersonalized>
</template>
<style scoped>
.button-revenue {
  color: #005725 !important;
  font-weight: 800;
}

.button-expense {
  color: #961f1f !important;
  font-weight: 800;
}
</style>
