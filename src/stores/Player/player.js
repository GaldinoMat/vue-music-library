import { Howl } from 'howler'
import { defineStore } from 'pinia'

export default defineStore('player', {
  state: () => ({
    songToPlay: {},
    sound: {},
    seek: '00:00',
    duration: '00:00'
  }),
  actions: {
    async toggleAudio(song) {
      if (Object.keys(this.sound).length === 0) {
        this.sound = new Howl({
          src: [song.url],
          html5: true
        })
      }

      if (!this.sound.playing) return

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()

        this.sound.on('play', () => {
          requestAnimationFrame(this.progress)
        })
      }
    },
    progress() {
      this.seek = this.sound.seek()
      this.duration = this.sound.duration()

      if (this.sound.playing()) requestAnimationFrame(this.progress)
    }
  },
  getters: {
    isPlaying: (state) => {
      if (state.sound.playing) return state.sound.playing()

      return false
    }
  }
})
