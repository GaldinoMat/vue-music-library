<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        id="play-btn"
        @click.prevent="checkAudioPlayState"
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i
          class="fas"
          :class="{
            'fa-play':
              JSON.stringify(this.currentSong) !== JSON.stringify(this.song) || !this.isPlaying,
            'fa-pause':
              JSON.stringify(this.currentSong) === JSON.stringify(this.song) || this.isPlaying
          }"
        />
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
        <div v-if="song.genre">{{ song.genre }}</div>
        <div v-else>None</div>
        <div class="song-price">{{ $n(1, 'currency') }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import usePlayerStore from '@/stores/Player/player.js'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'MusicHeader',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(usePlayerStore, ['isPlaying', 'currentSong', 'sound'])
  },
  methods: {
    ...mapActions(usePlayerStore, ['startNewSong', 'toggleAudio']),
    checkAudioPlayState() {
      if (
        Object.keys(this.currentSong).length === 0 ||
        JSON.stringify(this.currentSong) !== JSON.stringify(this.song)
      ) {
        this.startNewSong(this.song)
      } else {
        this.toggleAudio()
      }
    }
  }
}
</script>
