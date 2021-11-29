<template>
  <div class="player">
    <!-- Dashboard -->
    <div class="dashboard">
      <!-- Header -->
      <div class="song-info">
        <h4>Currently playing:</h4>
        <h2>{ SongTitle }</h2>
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
      <div class="time-info">
        <div class="time">
          <span id="currentTime">0:00</span>
        </div>

        <div class="time">
          <span id="duration">0:00</span>
        </div>
      </div>

    </div>

    <div class="utility-space">
      <div class="room-info">
        <RoomSelector></RoomSelector>
      </div>

      <div class="current-time-info">
        <h4>Current time:</h4>
<!--        <span id="currentTime">0</span>-->
      </div>

      <div class="king-toggle">
        <Button class="btn btn-king" @click="toggleKing()">
          <IconBase icon-name="whatever" icon-color="var(--color-lightyellow)">
            <IconStarEmpty v-if="!this.isKing"></IconStarEmpty>
            <IconStarFull v-if="this.isKing"></IconStarFull>
          </IconBase>
        </Button>
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

import {io} from "socket.io-client"

export default {
  name: 'MusicPlayer',
  data() {
    return {
      socket: null,
      currentTime: 0,
      isPlaying: false,
      isKing: false,
      currentSongIndex: 0,
      songs: [
        {name: '', URL: 'music.mp3'},
        {name: '', URL: 'https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3'},
      ]
    }
  },
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
      this.socket.emit('song:play', {'room': 1}) // todo: replace with state
      this.$refs.audio.play()
    },
    setSong(song) {
      this.$refs.audio.setAttribute('src', song.URL); // todo: do I need to call the 'load' method?
      this.socket.emit('song:change', {
        'room': 1,
        'song': song.URL
      });
    },
    pause() {
      console.log('> Pausing');
      this.socket.emit('song:pause', {'room': 1})
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
      this.isKing = this.isKing !== true;
      console.log('> Toggling isKing to ', this.isKing);
    }
  },
  created() {
    this.socket = io("http://localhost:5000");
    console.log("Created listeners");

    this.socket.on('broadcasted:song:play', function (msg) {
      console.log("Song play notification, msg");
      // this.$refs.audio.play()
    });
    this.socket.on('broadcasted:song:pause', function (msg) {
      console.log("Song pause notification, msg");
      // this.$refs.audio.pause()
    });
    this.socket.on('broadcasted:song:change', function (song) {
      console.log("Song change notification", song);
      // this.$refs.audio.setAttribute('src', song.URL);
    });
  },
}
</script>

<style scoped>

.player {
  min-width: 95vw;
  background-color: var(--color-white);
  display: grid;
  align-items: center;
}

.dashboard {
  padding: var(--spacing-03) var(--spacing-03);
  background-color: var(--color-white);
  width: 100%;
  max-width: 90vw;
  border-bottom: 1px solid var(--color-grey);
  display: grid;
  align-items: center;
}

/* Music player data (song title) */
.song-info {
  text-align: center;
  margin-bottom: var(--spacing-02);
}

.song-info h4 {
  color: var(--color-darkyellow);
  font-size: var(--font-size-s);
}

.song-info h2 {
  color: var(--color-text);
  font-size: var(--font-size-l);
}

/* Player controls section*/
.control {
  display: grid;
  grid-template-areas: ". . .";
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-04) 0 var(--spacing-04) 0;
}

.control .btn {
  padding: 18px;
  font-size: var(--font-size-xl);
}

.control .btn.active {
  fill: var(--color-lightyellow);
}

.control .btn-toggle-play {
  width: calc(var(--font-size-xl) * 2.333);
  height: calc(var(--font-size-xl) * 2.333);
  border-radius: 50%;
  font-size: var(--font-size-xl);
  color: var(--color-white);
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: var(--color-darkyellow);
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
  background-color: var(--color-lightblue);
  cursor: pointer;
}

.utility-space {
  display: grid;
  grid-template-areas: ". . .";
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-04) var(--spacing-03);
}

</style>
