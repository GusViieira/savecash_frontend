<script setup lang="ts">
const props = defineProps<{
  headers: Array<{
    key: string;
    title: string;
    sortable?: boolean;
  }>;
  items: unknown[];
}>()
</script>
<template>
  <v-data-table-server
    :items="props.items"
    :headers="props.headers"
    :items-length="props.items.length"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </v-data-table-server>
</template>
<style>
.v-data-table__thead {
  background-color: #9b51e0 !important;
  color: #fff !important;
}
</style>
