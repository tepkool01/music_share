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
.player {
  min-width: 95vw;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.dashboard {
  padding: var(--spacing-03) var(--spacing-03);
  background-color: var(--color-white);
  width: 100%;
  max-width: 90vw;
  border-bottom: 1px solid var(--color-grey);
}

/* Music player data (song title) */
header {
  text-align: center;
  margin-bottom: var(--spacing-02);
}

header h4 {
  color: var(--color-darkyellow);
  font-size: var(--font-size-s);
}

header h2 {
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
  color: var(--color-lightyellow);
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
</style>
