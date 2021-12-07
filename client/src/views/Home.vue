<template>
  <div class="container">555
    <MusicPlayer />
  </div>
</template>

<script>
import MusicPlayer from '../components/MusicPlayer'

export default {
  name: 'Home',
  components: {
    MusicPlayer
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
