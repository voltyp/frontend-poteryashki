import { defineStore } from 'pinia';

interface AnimalState {}

export const useAnimalStore = defineStore('animal', {
  state: (): AnimalState => ({

  }),
});
