<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Button from './components/Button.vue';

export default {
  components: {
    Header,
    Footer,
    Button
  },
  methods: {
    consoleClick() {
      console.log('Button clicked')
    }
  }
}
</script>

<style>
@import './assets/styles/variables.css';

@font-face {
  font-family: "Poppins";
  src: local("Poppins"),
  url(./assets/fonts/Poppins.ttf) format("truetype");
}

* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

body {
  background-color: var(--color-grey);
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.75;
}

html {
  box-sizing: border-box;
  font-size: 100%; /* 16px */
  font-family: "Poppins", sans-serif;
}

p {
  margin-bottom: var(--spacing-03);
}

small {
  font-size: var(--font-size-xs);
}
</style>
