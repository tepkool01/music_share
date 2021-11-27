<template>
  <RoomSelector />
  <MusicPlayer />
</template>

<script>
import MusicPlayer from '../components/MusicPlayer'
import RoomSelector from '../components/RoomSelector'

export default {
  name: 'Home',
  components: {
    MusicPlayer,
    RoomSelector,
  }
}
</script>