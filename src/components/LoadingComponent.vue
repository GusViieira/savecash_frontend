<script setup lang="ts">
const props = defineProps({
  value: Boolean,
})
</script>

<template>
  <div class="text-center">
    <v-overlay :model-value="props.value" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" :width="8" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>
