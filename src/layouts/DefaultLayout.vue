<script setup lang="ts">
  import { ref } from 'vue';
  import SidebarMenu from './components/SidebarMenu.vue';

  const drawer = ref(true);
</script>

<template>
  <sidebar-menu :drawer="drawer" />
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-toolbar-title>Потеряшки</v-toolbar-title>
  </v-app-bar>
  <v-main>
    <v-container>
      <slot />
    </v-container>
  </v-main>
</template>
