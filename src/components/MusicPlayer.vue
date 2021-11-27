<template>
  <div class="player">
    <!-- Dashboard -->
    <div class="dashboard">
      <!-- Header -->
      <header>
        <h4>Currently playing:</h4>
        <h2>{ SongTitle }</h2>
      </header>
      <!-- Progress Controller -->
      <div class="control">
        <div class="btn btn-back" onclick="togglePrevious()">
          <i class="fas fa-step-backward" id="icon-previous"></i>
        </div>

        <div class="btn btn-toggle-play" onclick="togglePlay()">
          <i class="fas fa-play" id="icon-play"></i>
        </div>
        <!--            <div class="btn btn-next" onclick="changeSong()">-->
        <div class="btn btn-next" onclick="toggleNext()">
          <i class="fas fa-step-forward" id="icon-next"></i>
        </div>
      </div>

      <input id="progress" class="progress" type="range" value="0" step="1" min="0" max="100" />

      <audio id="audio" preload="none" tabindex="0">
        <source src="music.mp3" data-track-number="1" />
        <source src="https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3" data-track-number="2" />
      </audio>
    </div>

    <div class="todo-space">
      <!-- https://codepen.io/craigstroman/pen/aOyRYx -->
      <div class="room">
        <div>
          <span>Currently in room:</span>
          <span id="roomText"></span>
        </div>
        <label for="room">Room</label><input id="room" />
        <button onclick="roomChange()">Join Room</button>
      </div>

      <h4>Current time:</h4>
      <span id="currentTime">0</span>

      <div class="btn btn-toggle-control" onclick="toggleKing()">
        <i class="fas fa-crown" id="icon-king"></i>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
:root {
  --color-darkblue: hsl(225, 40%, 18%);
  --color-lightblue: hsl(213, 30%, 32%);
  --color-grey: hsl(0, 0%, 96%);
  --color-white: hsl(0, 0%, 100%);
  --color-text: hsl(0, 0%, 20%);
  --color-darkyellow: hsl(31, 50%, 66%);
  --color-lightyellow: hsl(37, 72%, 78%);
  --color-icon: hsl(0, 0%, 40%)
}

* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}

body {
  background-color: var(--color-grey);
}

html {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.player {
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--color-white);
}

.dashboard {
  padding: 16px 16px 14px;
  background-color: var(--color-white);
  width: 100%;
  max-width: 480px;
  border-bottom: 1px solid var(--color-grey);
}

/* HEADER */
header {
  text-align: center;
  margin-bottom: 10px;
}

header h4 {
  color: var(--color-darkyellow);
  font-size: 12px;
}

header h2 {
  color: var(--color-text);
  font-size: 20px;
}

.control {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 18px 0 8px 0;
}

.control .btn {
  color: var(--color-icon);
  padding: 18px;
  font-size: 18px;
}

/* TODO: JS logic to toggle the button's state to active*/
.control .btn.active {
  color: var(--color-lightyellow);
}

.control .btn-toggle-play {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-darkyellow);
}

.progress {
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 6px;
  background-color: var(--color-lightblue);
  cursor: pointer;
}

/* Hodgepodge CSS zone */
button {
  border: none;
  padding: 1em;
  border-radius: 8px;
  transition:
      background-color 400ms ease,
      color 400ms ease;
  background-color: #c9c9c9;
  color: #222222;
}

input {
  border-width: 0 0 1px 0;
  background: none;
  outline: none;
  margin: 0 4px;
}

.todo-space {
  padding: 16px 16px 14px;
}
</style>