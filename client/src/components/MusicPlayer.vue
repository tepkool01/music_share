<template>
  <div class="player">
    <!-- Dashboard -->
    <div class="dashboard">
      <!-- .song-info -->
      <div class="song-info">
        <h4>Currently playing:</h4>
        <h2>{{ songs[currentSongIndex].name }}</h2>
      </div>
      <!-- Progress Controller -->
      <div class="control">
        <Button class="btn btn-back" @click="back()">
          <IconBase icon-name="backwards">
            <IconBackwards></IconBackwards>
          </IconBase>
        </Button>

        <Button class="btn btn-toggle-play" @click="togglePlay()">
          <IconBase icon-name="play" icon-color="var(--color-white)">
            <IconPlay v-if="!this.isPlaying"></IconPlay>
            <IconPause v-if="this.isPlaying"></IconPause>
          </IconBase>
        </Button>

        <Button class="btn btn-next" @click="next()">
          <IconBase icon-name="forwards">
            <IconForwards></IconForwards>
          </IconBase>
        </Button>
      </div>

      <input id="progress" class="progress" type="range" value="0" step="1" min="0" max="100"/>

      <audio ref="audio" id="audio" preload="none" tabindex="0">
        <source v-for="(song, index) in songs" :src="song.URL" :data-track-number="index + 1"/>
      </audio>

      <div class="utility-space">
        <div class="room-info">
          <RoomSelector></RoomSelector>
        </div>
        <div class="current-time-info">
          <h4>Current time:</h4>
          <span id="currentTime">0</span>
        </div>
        <div class="king-toggle">
          <Button class="btn btn-king" @click="toggleKing()">
            <IconBase icon-name="whatever">
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
import Button from "@/components/Button";

import IconBase from "@/components/IconBase";
import IconBackwards from "@/components/icons/IconBackwards";
import IconPlay from "@/components/icons/IconPlay";
import IconPause from "@/components/icons/IconPause";
import IconForwards from "@/components/icons/IconForwards";
import IconStarEmpty from "@/components/icons/IconEmpty";
import IconStarFull from "@/components/icons/IconStarFull";

import RoomSelector from '../components/RoomSelector';
import {mapState} from "vuex";

export default {
  name: 'MusicPlayer',
  inject: ['socket'],
  components: {
    IconStarEmpty,
    IconStarFull,
    IconForwards,
    IconPlay,
    IconPause,
    IconBackwards,
    IconBase,
    Button,
    RoomSelector
  },
  data() {
    return {
      currentTime: 0,
      isPlaying: this.$store.state.isPlaying,
      isKing: false,
      currentSongIndex: this.$store.state.currentSongIndex,
      songs: this.$store.state.songs
    }
  },
  computed: {
    ...mapState(['roomID']),
    activeSong () {
      return this.songs[this.currentSongIndex]
    }
  },
  methods: {
    togglePlay() {
      console.log('> Play/Pause toggled');
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play() // todo, promise/await?
      }
      this.isPlaying = !this.isPlaying
    },
    play() {
      console.log('> Playing');
      this.socket.emit('song:play', {'room': this.roomID})
      this.$store.dispatch('changePlayState', true)
      this.$refs.audio.play()
    },
    setSong(song) {
      console.log('> Set Song', song);
      this.$refs.audio.setAttribute('src', song.URL); // todo: do I need to call the 'load' method?
      this.socket.emit('song:change', {
        'room': this.roomID,
        'song': song.URL
      });
    },
    pause() {
      console.log('> Pausing');
      this.socket.emit('song:pause', {'room': this.roomID})
      this.$store.dispatch('changePlayState', false)
      this.$refs.audio.pause()
    },
    next() {
      console.log('> Next');
      this.currentSongIndex += 1
      this.setSong(this.songs[this.currentSongIndex])
      if (this.isPlaying) {
        this.play()
      }
    },
    back() {
      console.log('> Back');
      this.currentSongIndex -= 1
      this.setSong(this.songs[this.currentSongIndex])
      if (this.isPlaying) {
        this.play()
      }
    },
    toggleKing() {
      this.isKing = !this.isKing;
      console.log('> Toggling isKing to ', this.isKing);
    }
  },
  mounted() {
    console.log("Created listeners");

    this.socket.on('broadcasted:song:play', (msg) => {
      console.log("Song play notification, msg");
      this.$refs.audio.play()
    });
    this.socket.on('broadcasted:song:pause', (msg) => {
      console.log("Song pause notification, msg");
      this.$refs.audio.pause()
    });
    this.socket.on('broadcasted:song:change', (song) => {
      console.log("Song change notification", song);
      this.$refs.audio.setAttribute('src', song);
      this.$refs.audio.load()
      if (this.isPlaying) {
        this.$refs.audio.play()
      }
    });

    // just for testing
    this.$refs.audio.ontimeupdate = () => {
      console.log(this.$refs.audio.currentTime);
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
  margin-bottom: var(--spacing-03);
  background-color: var(--color-white);
  padding: var(--spacing-02) var(--spacing-03);
  border-radius: 5px;
  box-shadow: 0 2px 3px var(--color-neutral-90);
}

/* Music player data (song title) */
.song-info {
  text-align: center;
  margin-bottom: var(--spacing-02);
}

.song-info h4 {
  color: var(--color-primary);
  font-size: var(--font-size-s);
}

.song-info h2 {
  color: var(--color-text);
  font-size: var(--font-size-l);
}

/* Player controls section*/
.control {
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
  -webkit-appearance: none;
  height: var(--spacing-03);
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--spacing-02);
  height: var(--spacing-03);
  background-color: var(--color-primary);
  cursor: pointer;
}

.utility-space {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-04) 0 var(--spacing-04) 0;
}
</style>
