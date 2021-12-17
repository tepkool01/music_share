<template>
  <div>
    <h4>Currently in room:</h4>
    <span>{{ this.roomID }}</span>
  </div>
  <label for="room">Room</label>
  <input v-model="room" id="room"/>
  <button v-on:click="roomChange">Join Room</button>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: 'RoomSelector',
  data() {
    return {
      room: 0
    }
  },
  computed: {
    ...mapState(['roomID']),
  },
  methods: {
    roomChange() {
      console.log("> roomChange", this.room)
      this.$store.dispatch('changeRoom', this.room)
    }
  },
}
</script>

<style scoped>
</style>
