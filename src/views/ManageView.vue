<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <!-- 
          Refs are a feature of Vue.
          They are references to whole components, to which we can use to access methods and data 
          from it.
          They are not commonly used, since they are not reactive.
          Which means that changes made to the ref are not reflected to the component's data instance,
          only to the DOM.
        -->
        <MusicUpload ref="upload" :addSong="addSong" />
      </div>
      <MusicList>
        <!-- Composition Items -->
        <MusicCompositionItem
          v-for="(song, index) in songs"
          :key="song.docId"
          :song="song"
          :updateSong="updateSong"
          :index="index"
          :removeSong="removeSong"
          :updateFlag="updateFlag"
        />
      </MusicList>
    </div>
  </section>
</template>

<script>
import MusicUpload from '@/components/MusicUpload/MusicUpload.vue'
import MusicList from '@/components/MusicList/MusicList.vue'
import MusicCompositionItem from '@/components/MusicList/components/MusicCompositionItem/MusicCompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase.js'

export default {
  name: 'ManageView',
  components: {
    MusicUpload,
    MusicList,
    MusicCompositionItem
  },
  data() {
    return {
      songs: [],
      unsaved: false
    }
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modifiedName = values.SongTitle
      this.songs[index].genre = values.SongGenre
    },
    removeSong(index) {
      this.songs.splice(index, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }

      this.songs.push(song)
    },
    updateFlag(value) {
      this.unsaved = value
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  /**
    This is a Navigation guard for components. Contrary to the ohter two possibilities,
    this one has access to the components instance.
  */
  beforeRouteLeave(to, from, next) {
    if (!this.unsaved) {
      next()
    } else {
      const leave = confirm('You have unchanged changes. Are you sure you want to leave the page?')
      next(leave)
    }
  }
}
</script>
