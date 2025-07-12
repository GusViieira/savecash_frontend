<script setup lang="ts">
import { reactive } from 'vue'
import type { Pagination } from '@/models/Pagination'
import type {
  TransactionDTO,
  TransactionResponseModel,
} from '@/models/response/TransactionResponseModel'
import DataTable from '@/components/DataTable.vue'
import CreateCategoryView from './details/CreateCategoryView.vue'
import { ref } from 'vue'
import ModalPersonalized from '@/components/ModalPersonalized.vue'

const dialog = ref(false)

const headers = [
  {
    key: 'type',
    sortable: true,
    title: 'Ícone',
    align: 'center',
  },
  { key: 'date', title: 'Categoria', align: 'center', sortable: true },
  { key: 'description', title: 'Tipo de transação', align: 'right', sortable: false },
  { key: 'actions', title: 'Ações', sortable: false, align: 'center' },
]

const state = reactive<state>({
  items: {} as TransactionResponseModel,
  item: { loading: false } as TransactionDTO,
  pagination: {
    page: 0,
    size: 10,
    totalPage: 0,
  } as Pagination,
})
</script>

<template>
  <v-card>
    <v-card-title class="bg-lightGrey pa-5">
      <v-row>
        <v-col>
          <v-btn class="button" color="primary" rounded="xl" @click="dialog = true">
            Criar categoria <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <data-table
        :headers="headers"
        :items="state.items.transactionDTO"
        :totalPage="state.items.totalPage"
        :size="state.pagination.size"
        :page="state.pagination.page"
      >
      </data-table>
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" max-width="600">
    <ModalPersonalized
    title="title"
    icon="mdi-bank-transfer"
    width="650">
  </ModalPersonalized>
  </v-dialog>
</template>
