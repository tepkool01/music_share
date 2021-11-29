<template>
    <div>
      <h4>Currently in room:</h4>
      <span id="roomText"></span>
    </div>
    <label for="room">Room</label><input id="room" />
    <button v-on:click="roomChange">Join Room</button>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: 'RoomSelector',
  inject: ['socket'],
  computed: {
    ...mapState(['roomID']),
  },
  methods: {
    roomChange() {
      console.log("> roomChange")
      this.socket.emit('room:change', 1);
      this.$store.dispatch('changeRoom', 1)
    }
  },
}
</script>

<style scoped>
</style>
