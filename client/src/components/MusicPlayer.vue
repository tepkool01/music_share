<template>
  <div class="player">
    <!-- Dashboard -->
    <div class="dashboard">

      <div class="current-song">
        <h4>Currently playing:</h4>
        <h2>{{ songs[currentSongIndex].name }}</h2>
      </div>

      <div class="control">
        <Button class="btn btn-back" @click="back()" :disabled="!this.isKing">
          <IconBase icon-name="backwards">
            <IconBackwards></IconBackwards>
          </IconBase>
        </Button>

        <Button class="btn btn-toggle-play" @click="togglePlay()" :disabled="!this.isKing">
          <IconBase icon-name="play" icon-color="var(--color-white)">
            <IconPlay v-if="!this.isPlaying"></IconPlay>
            <IconPause v-if="this.isPlaying"></IconPause>
          </IconBase>
        </Button>

        <Button class="btn btn-next" @click="next()" :disabled="!this.isKing">
          <IconBase icon-name="forwards">
            <IconForwards></IconForwards>
          </IconBase>
        </Button>
      </div>

      <div class="progress">
        <input id="progress" class="progress-bar" type="range" @click="seek()" v-model="this.currentSongTime" :disabled="!this.isKing" step="1" min="0" :max="this.currentSongDuration"/>
        <div class="time">
            <span id="current-time">{{ formattedCurrentSongTime }}</span>
            <span id="duration">{{ formattedCurrentSongDuration }}</span>
        </div>
      </div>

      <audio ref="audio" id="audio" preload="auto" tabindex="0">
        <source v-for="(song, index) in songs" :src="song.URL" :data-track-number="index + 1"/>
      </audio>

      <div class="player-utilities">
        <div class="room-selector">
          <RoomSelector></RoomSelector>
        </div>

        <div class="king-toggle">
          <Button class="btn btn-king" @click="toggleKing()">
            <IconBase icon-name="King Toggle">
              <IconStarEmpty v-if="!this.isKing"></IconStarEmpty>
              <IconStarFull v-if="this.isKing"></IconStarFull>
            </IconBase>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomSelector from '../components/RoomSelector'
import Button from '../components/Button'
import IconBase from '../components/IconBase'
import { IconBackwards, IconPlay, IconPause, IconStarEmpty, IconStarFull, IconForwards } from '../components/icons'

// Grabbing utility functions from vuex (the global variable store)
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MusicPlayer',
  components: { IconStarEmpty, IconStarFull, IconForwards, IconPlay, IconPause, IconBackwards, IconBase, Button, RoomSelector },
  data() {
    return {
      currentSongDuration: 0,
      // loop: false, // todo
    }
  },
  computed: {
    // Grabbing global state variables from the vuex store
    ...mapState(['roomID', 'isPlaying', 'currentSongIndex', 'songs', 'isKing']),
    // Using currentSongTime as a global state variable for various sync'ing options
    currentSongTime: {
      get() { return this.$store.state.currentSongTime },
      set(value) {this.$store.commit('SET_SONG_TIME', value)}
    },
    formattedCurrentSongTime() {
      return new Date(this.currentSongTime * 1000).toISOString().substr(14, 5)
    },
    formattedCurrentSongDuration() {
      return new Date(this.currentSongDuration * 1000).toISOString().substr(14, 5)
    },
  },
  // Watchers 'watch' variables, and are named after the variables they are watching. If the variable changes, the function is invoked
  watch: {
    currentSongTime(val) {
      // detect a shift in the alerted time and actual time, from either a seek operation
      if (Math.abs(this.$refs.audio.currentTime - val) >= 1) {
        this.$refs.audio.currentTime = val
      }
    },
    isPlaying(val) {
      val === true ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    currentSongIndex(val) {
      this.$refs.audio.setAttribute('src', this.songs[val].URL)
      this.$refs.audio.load()
      // if the song is changed and they were already in a playing state, automatically play the song
      if (this.isPlaying === true) {
        this.$refs.audio.play()
      }
    },
  },
  methods: {
    ...mapActions(['changeSong', 'changePlayState', 'changeKing', 'seekSong']), // Grabbing actions from vuex store to make API calls and have the new state reflected globally
    togglePlay() {
      console.log('> Play/Pause toggled');
      this.changePlayState({ broadcasted: false, playState: !this.isPlaying })
    },
    next() {
      console.log('> Next');
      if (this.currentSongIndex >= this.songs.length - 1) return // Reached end of playlist
      this.changeSong({ broadcasted: false, songIndex: this.currentSongIndex + 1 })
    },
    back() {
      console.log('> Back');
      if (this.currentSongIndex <= 0) return // Reached beginning of playlist, restart song
      this.changeSong({ broadcasted: false, songIndex: this.currentSongIndex - 1 })
    },
    toggleKing() {
      console.log('> Toggling isKing to ', !this.isKing);
      this.changeKing({ broadcasted: false, isKing: !this.isKing })
    },
    seek() {
      console.log('> Seek', this.currentSongTime)
      this.seekSong(this.currentSongTime)
    }
  },
  mounted() {
    console.log("Created listeners");

    // Setting initial song duration, wait for the metadata to load from the song
    this.$refs.audio.onloadedmetadata = () => {
      this.currentSongDuration = this.$refs.audio.duration
    };

    // Song has ended, go to next song
    this.$refs.audio.onended = () => this.next()

    // just for testing
    this.$refs.audio.ontimeupdate = () => {
      this.currentSongTime = this.$refs.audio.currentTime
    };
  },
}
</script>

<style scoped>

.player {
  padding: var(--spacing-03);
  max-width: 60rem;
}

.dashboard {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-white);
  padding: var(--spacing-02) var(--spacing-03);
  border-radius: 5px;
  box-shadow: 0 2px 3px var(--color-neutral-90);
}

/* Music player data (song title) */
.current-song {
  text-align: center;
  margin-bottom: var(--spacing-01);
}

.current-song h4 {
  color: var(--color-primary);
  font-size: var(--font-size-s);
}

.current-song h2 {
  color: var(--color-text);
  font-size: var(--font-size-l);
}

/* Player controls section*/
.control {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-04) 0 var(--spacing-04) 0;
}

.control .btn {
  color: var(--color-icon);
  padding: 18px;
  font-size: var(--font-size-xl);
}

.control .btn.active {
  color: var(--color-princeton-orange);
}

.control .btn-toggle-play {
  width: calc(var(--font-size-xl)*2.333);
  height: calc(var(--font-size-xl)*2.333);
  border-radius: 50%;
  font-size: var(--font-size-xl);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
}

.progress {
  width: 100%;
}

.progress-bar {
  width: 100%;
  -webkit-appearance: none;
  height: var(--spacing-03);
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--spacing-02);
  height: var(--spacing-03);
  background-color: var(--color-primary);
  cursor: pointer;
}

.time {
  display: flex;
  justify-content: space-between;
  color: var(--color-neutral-60);
}

.player-utilities {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-04) 0 var(--spacing-04) 0;
}
</style>
