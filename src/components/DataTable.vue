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
  <v-data-table-server :items="props.items" :headers="props.headers" :items-length="size">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="state.pagination.page" :length="totalPage"></v-pagination>
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn color="primary" variant="text" @click="$emit('edit', item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="error" variant="text" @click="$emit('delete', item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table-server>
</template>
<style>
.v-data-table__thead {
  background-color: #9b51e0 !important;
  color: #fff !important;
}
</style>
