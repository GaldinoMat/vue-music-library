import { Howl } from 'howler'
import { defineStore } from 'pinia'
import helper from '@/includes/helper'

export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async startNewSong(song) {
      if (this.sound instanceof Howl) {this.sound.unload()}

      this.currentSong = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
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
      this.seek = helper.formatSongTime(this.sound.seek())
      this.duration = helper.formatSongTime(this.sound.duration())

      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

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
