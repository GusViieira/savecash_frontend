<template>
  <h1>Lançamentos</h1>

  <v-card>
    <v-card-title class="bg-lightGrey pt-6 px-5">
      <v-row>
        <v-col>
          <v-btn class="button" color="primary" rounded="xl"
            >Registrar <v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="3">
          <v-text-field
            variant="outlined"
            density="compact"
            label="Filtro"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <h1>Teste</h1>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped></style>
