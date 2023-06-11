<template>
  <main>
    <!-- Music Header -->
    <MusicHeader :song="song" />
    <!-- Comments -->
    <CommentSection :commentCount="song.commentCount">
      <!-- Form -->
      <CommentForm :getComments="getComments" @update-song-comments-db="updateSongCommentsDb">
        <!-- Sort Comments -->
        <SortingComponent @change-sort="changeSort" />
      </CommentForm>
    </CommentSection>
    <!-- Comments -->
    <ul class="container mx-auto">
      <CommentListItem
        v-for="comment in sortedComments"
        :key="comment.commentId"
        :comment="comment"
      />
    </ul>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { songsCollection, commentsCollection } from '@/includes/firebase.js'
import CommentSection from '@/components/CommentSection/CommentSection.vue'
import CommentListItem from '@/components/CommentListItem/CommentListItem.vue'
import MusicHeader from '@/components/MusicHeader/MusicHeader.vue'
import CommentForm from '@/components/CommentForm/CommentForm.vue'
import SortingComponent from '@/components/SortingComponent/SortingComponent.vue'

let song = reactive({})
let comments = reactive([])
let sort = ref('latest')

const route = useRoute()
const router = useRouter()

const sortedComments = computed(() => {
  return comments
    .slice()
    .sort((a, b) =>
      sort.value === 'latest'
        ? new Date(b.datePosted) - new Date(a.datePosted)
        : new Date(a.datePosted) - new Date(b.datePosted)
    )
})

const getComments = async () => {
  const commentsSnapshot = await commentsCollection.where('songId', '==', route.params.id).get()

  const newComments = commentsSnapshot.docs.map((comment) => {
    return {
      commentId: comment.id,
      ...comment.data()
    }
  })

  Object.assign(comments, newComments)
}
const changeSort = (newValue) => {
  sort.value = newValue
}
const updateSongCommentsDb = async () => {
  song.commentCount += 1

  await songsCollection.doc(route.params.id).update({
    commentCount: song.commentCount
  })
}

;(async function () {
  const songSnapshot = await songsCollection.doc(route.params.id).get()

  if (!songSnapshot.exists) {
    router.push({ name: 'Home' })
    return
  }

  let { sort } = route.query

  sort = sort === 'latest' || sort === 'oldest' ? sort : 'latest'

  Object.assign(song, songSnapshot.data())
  await getComments()
})()

watch(
  () => sort.value,
  (newValue) => {
    if (newValue === route.query.sort) return

    router.push({
      query: {
        sort: newValue
      }
    })
  }
)
</script>
