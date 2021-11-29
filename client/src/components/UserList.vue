<template>
  <div>
    <ul>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  inject: ['socket'],
  data() {
    return {
      users: [],
    }
  },
  methods: {
    init() {
      // todo: initialize with current user list
    }
  },
  created() {
    this.init()
  }
}
</script>