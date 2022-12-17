<template>
  <v-app>
    <Luckydraw :restart="restart" @clicked="onClickChild" />
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import Luckydraw from './components/Luckydraw.vue';
import { loadConfettiShape } from 'tsparticles-shape-confetti';

export default {
  name: 'App',
  components: {
    Luckydraw,
  },
  data() {
    return {
      celebrate: false,
      restart: false,
    };
  },
  watch: {},
  methods: {
    particlesInit(main) {
      loadConfettiShape(main);
    },
    onClickBack() {
      this.restart = true;
      this.celebrate = false;
    },
    onClickChild(state, counter) {
      if (counter > 4) return;
      switch (state) {
        case 4:
          // this.celebrate = true;
          break;

        default:
          this.celebrate = false;
      }
      this.restart = false;
    },
  },
};
</script>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.back-button {
  position: absolute;
  left: 3vw;
  top: 86vh;
  z-index: 99;
}
</style>
