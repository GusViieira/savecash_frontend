<script setup lang="ts">
import PerfilView from './details/PerfilView.vue'
import PasswordView from './details/PasswordView.vue'
</script>

<template>
  <h1>Configurações</h1>
  <v-expansion-panels>
    <v-expansion-panel title="Perfil" class="mb-2">
      <v-expansion-panel-text>
        <PerfilView />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-expansion-panels>
    <v-expansion-panel title="Alterar senha" class="mb-2">
      <v-expansion-panel-text>
        <PasswordView />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
