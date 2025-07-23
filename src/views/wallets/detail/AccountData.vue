<script setup lang="ts">
import type AccountResponseModel from '@/models/response/AccountResponseModel'
import { TYPE_ACCOUNT, STATUS_ACCOUNT, PURPOSE_ACCOUNT } from '@/utils/constants';
import { format } from 'date-fns'
import { onMounted, reactive, watch } from 'vue'

const props = defineProps<{
  account: AccountResponseModel
}>()

interface state {
  account: AccountResponseModel
}

const state = reactive<state>({
  account: {} as AccountResponseModel,
})

watch(
  () => props.account,
  () => {
    state.account = props.account
    const createAt = state.account.createAt

    const isFormatted = typeof createAt === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(createAt)

    state.account.createAt =
      createAt && !isFormatted ? format(new Date(createAt), 'dd/MM/yyyy') : createAt
  },
)

onMounted(() => {
  state.account = props.account
  state.account.createAt = state.account.createAt
    ? format(new Date(state.account.createAt), 'dd/MM/yyyy')
    : ''
})

</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4">
      <v-text-field
        v-model="state.account.name"
        label="Nome"
        variant="solo-filled"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-select
        v-model="state.account.type"
        label="Tipo"
        variant="solo-filled"
        density="compact"
        disabled
        :items="TYPE_ACCOUNT"
        item-title="label"
        item-value="id"
      />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="2">
      <v-select
        v-model="state.account.status"
        label="Status"
        variant="solo-filled"
        density="compact"
        :items="STATUS_ACCOUNT"
        item-title="label"
        item-value="id"
      />
    </v-col>
    <v-col cols="12" sm="12" md="3" lg="3">
      <v-select
        v-model="state.account.purpose"
        label="Finalidade"
        variant="solo-filled"
        density="compact"
        disabled
        :items="PURPOSE_ACCOUNT"
        item-title="label"
        item-value="id"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="12" md="2" lg="2">
      <v-text-field
        v-model="state.account.currency"
        label="Moeda"
        variant="solo-filled"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="12" md="2" lg="2">
      <v-text-field
        v-model="state.account.createAt"
        label="Data de criação"
        variant="solo-filled"
        density="compact"
        disabled
      />
    </v-col>
    <v-col class="mt-n2">
      <v-checkbox label="Conta padrão" />
    </v-col>
  </v-row>
</template>
