<template>
    <div>
      <h4>Currently in room:</h4>
      <span id="roomText"></span>
    </div>
    <label for="room">Room</label><input id="room" />
    <button onclick="roomChange()">Join Room</button>
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
      this.$store.dispatch('setRoom', 1)
    }
  },
}
</script>

<style scoped>
</style>
