<template>
  <div ref="playlist" class="playlist">
      <div v-for="(song, index) in songs" class="song" @click="selectSong(index)">
        <div class="thumb">
        </div>
        <div class="body">
          <h3 class="title">{{song.name}}</h3>
          <p class="author">{{song.URL}}</p>
        </div>
        <div class="option">
          <!--        TODO: needs to be own component-->
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="16" viewBox="0 0 22 16">
            <path fill="#000000" d="M0 3h14v3h-14v-3zM0 7h14v3h-14v-3zM0 11h14v3h-14v-3z"></path>
            <path fill="#000000" d="M15.5 9l3 3 3-3z"></path>
            <path fill="#000000" d="M21.5 8l-3-3-3 3z"></path>
          </svg>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sortable from 'sortablejs'

// var el = document.getElementById('items');
// var sortable = Sortable.create(el);

export default {
  name: "Playlist",
  computed: {
    ...mapState(['songs', 'isKing'])
  },
  methods: {
    ...mapActions(['changeSong', 'updatePlaylist']),
    selectSong(songIndex) {
      console.log(">>selectSong()", songIndex)
      if (this.isKing === false) return
      this.changeSong({ broadcasted: false, songIndex: songIndex })
    }
  },
  // when the component is ready, we are going to create a sortable list
  mounted() {
    console.log(this.$refs.playlist.id)
    const sortable = new Sortable(this.$refs.playlist, {
      onEnd: (draggedItem) => {
        let songs = this.songs
        let replacedValue = this.songs[draggedItem.newIndex]
        songs[draggedItem.newIndex] = songs[draggedItem.oldIndex]
        songs[draggedItem.oldIndex] = replacedValue
        this.updatePlaylist(songs)
        console.log(draggedItem)
        console.log("old", draggedItem.oldIndex)
        console.log("new", draggedItem.newIndex)
      }
    })

  }
}
</script>

<style scoped>

.playlist {
  padding: var(--spacing-03);
  max-width: 60rem;
}

.song {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-03);
  background-color: var(--color-white);
  padding: var(--spacing-02) var(--spacing-03);
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.song.active {
  background-color: var(--color-primary);
}

.song:active {
  opacity: 0.8;
}

.song.active .option,
.song.active .author,
.song.active .title {
  color: var(--color-neutral-20);
}

.song .thumb {
  width: var(--spacing-05);
  height: var(--spacing-05);
  border-radius: 50%;
  background-color: var(--color-primary);
  margin: 0 var(--spacing-02);
}

.song .body {
  flex: 1;
  padding: 0 var(--spacing-03);
}

.song .title {
  font-size: var(--font-size-s);
  color: var(--color-text);
}

.song .author {
  font-size: var(--font-size-xs);
  color: #999999;
}

.song .option {
  padding: var(--spacing-03) var(--spacing-02);
  fill: #999;
}
</style>
