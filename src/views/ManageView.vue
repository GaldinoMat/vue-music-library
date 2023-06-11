<template>
  <main>
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
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import MusicUpload from '@/components/MusicUpload/MusicUpload.vue'
import MusicList from '@/components/MusicList/MusicList.vue'
import MusicCompositionItem from '@/components/MusicList/components/MusicCompositionItem/MusicCompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase.js'

const songs = reactive([])
let unsaved = ref(false)

const updateSong = (index, values) => {
  songs[index].modifiedName = values.SongTitle
  songs[index].genre = values.SongGenre
}
const removeSong = (index) => {
  songs.splice(index, 1)
}
const addSong = (document) => {
  const song = {
    ...document.data(),
    docId: document.id
  }

  songs.push(song)
}
const updateFlag = (value) => {
  unsaved.value = value
}

;(async function () {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

  snapshot.forEach(addSong)
})()

onBeforeRouteLeave((to, from, next) => {
  if (!unsaved.value) {
    next()
  } else {
    const leave = confirm('You have unchanged changes. Are you sure you want to leave the page?')
    next(leave)
  }
})
</script>
