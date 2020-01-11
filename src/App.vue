<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">Inventory</div>
      <v-spacer></v-spacer>

      <v-btn text>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Inventory />
    </v-content>
  </v-app>
</template>

<script>
import Inventory from "./components/Inventory";

export default {
  name: "App",

  components: {
    Inventory
  }
};
</script>
