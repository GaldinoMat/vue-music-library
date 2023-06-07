<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.introductionHeader') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">{{ $t('home.songs') }}</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-green-400 text-xl" />
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongPlaylistItem v-for="song in songs" :key="song.docId" :song="song" />
        </ol>
        <!-- end Playlist -->
      </div>
    </section>
  </main>
</template>

<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import { songsCollection } from '@/includes/firebase.js'
import SongPlaylistItem from '@/components/SongPlaylistItem/SongPlaylistItem.vue'

const songs = reactive([])
const maxPerPage = ref(25)
let pendingReq = ref(false)

const getSongs = async () => {
  if (pendingReq.value) return

  pendingReq.value = true

  let songsSnapshots
  try {
    if (songs.length) {
      const lastDoc = await songsCollection.doc(songs[songs.length - 1].docId).get()
      songsSnapshots = await songsCollection
        .orderBy('modifiedName')
        .startAfter(lastDoc)
        .limit(maxPerPage.value)
        .get()
    } else {
      songsSnapshots = await songsCollection.orderBy('modifiedName').limit(maxPerPage.value).get()
    }
  } catch (error) {
    console.error('Error while fetching songs. Please, try again later')
  }

  songsSnapshots.forEach((song) => {
    songs.push({
      docId: song.id,
      ...song.data()
    })
  })

  pendingReq.value = false
}

const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window

  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

  if (bottomOfWindow) {
    getSongs()
  }
}

;(async function () {
  await getSongs()

  window.addEventListener('scroll', handleScroll)
})()

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
