<template>
  <div class="container">
    <MusicPlayer />
    <Playlist />
  </div>
</template>

<script>
import MusicPlayer from '../components/MusicPlayer'
import Playlist from "@/components/Playlist";

export default {
  name: 'Home',
  components: {
    Playlist,
    MusicPlayer
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "MusicPlayer"
    "Playlist"
  ;
}
</style>
