<script setup lang="ts">
import type { Pagination } from '@/models/Pagination'
import { reactive, watch } from 'vue'

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'edit', item: unknown): void
  (e: 'delete', item: unknown): void
}>()

const props = defineProps<{
  headers: Array<{
    key: string
    title: string
    sortable?: boolean
  }>
  items: unknown[]
  page: number
  size: number
  totalPage: number
}>()

interface state {
  pagination: Pagination
}

const state = reactive<state>({
  pagination: {} as Pagination,
})

watch(
  () => state.pagination.page,
  (newPage) => {
    emit('update:page', newPage - 1)
  },
)
</script>
<template>
  <v-data-table
    :items="props.items"
    :headers="props.headers"
    :items-length="size"
    no-data-text="Nenhum lançamento encontrado para este mês."
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="state.pagination.page" :length="totalPage"></v-pagination>
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-pencil-outline"
            color="primary"
            @click="$emit('edit', item)"
          ></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            density="compact"
            variant="text"
            icon="mdi-delete-outline"
            color="error"
            @click="$emit('delete', item)"
          ></v-btn>
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>
<style>
.v-table {
  border-radius: 10px !important;
}
.v-data-table thead {
  color: #fff !important;
  background-color: #9b51e0 !important;
}
.v-data-table-header__content {
  background-color: transparent !important;
}
.v-table--density-default {
  --v-table-header-height: 40px !important;
  --v-table-header-border-radius: 10px !important;
  --v-table-row-height: 40px !important;
}
.v-table__wrapper {
  overflow: hidden !important;
}
</style>
