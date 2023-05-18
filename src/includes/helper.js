export default {
  formatSongTime(songTime) {
    const minutes = Math.floor(songTime / 60) || 0
    const seconds = Math.round(songTime - minutes * 60 || 0)

    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
  }
}
