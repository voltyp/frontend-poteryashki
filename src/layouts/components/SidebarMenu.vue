<script setup lang="ts">
  const props = defineProps<{
    drawer: boolean;
  }>();

  const menu = [
    {
      name: 'Наши животные',
      route: 'animals',
    },
    {
      name: 'Волонтеры',
      route: '',
    },
    {
      name: 'Справочники',
      route: '',
    },
  ];
</script>

<template>
  <v-navigation-drawer :model-value="drawer">
    <v-list>
      <v-list-item v-for="item in menu" :key="item.route">
        <router-link :to="{ name: item.route }">
          {{ item.name }}
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
