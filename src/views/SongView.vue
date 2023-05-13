<template>
  <!-- Music Header -->
  <MusicHeader :song="song" />
  <!-- Form -->
  <CommentSection />
  <!-- Comments -->
  <ul class="container mx-auto">
    <CommentListItem v-for="comment in comments" :key="comment.commentId" :comment="comment" />
  </ul>
</template>

<script>
import { songsCollection, commentsCollection } from '@/includes/firebase.js'
import CommentSection from '@/components/CommentSection/CommentSection.vue'
import CommentListItem from '@/components/CommentListItem/CommentListItem.vue'
import MusicHeader from '@/components/MusicHeader/MusicHeader.vue'

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      comments: []
    }
  },
  components: {
    CommentSection,
    CommentListItem,
    MusicHeader
  },
  async created() {
    const songSnapshot = await songsCollection.doc(this.$route.params.id).get()

    if (!songSnapshot.exists) {
      this.$router.push({ name: 'Home' })
      return
    }

    this.song = songSnapshot.data()
    this.getComments()
  },
  methods: {
    async getComments() {
      const commentsSnapshot = await commentsCollection
        .where('songId', '==', this.$route.params.id)
        .get()

      this.comments = []

      commentsSnapshot.forEach((comment) => {
        console.log(comment.data())
        this.comments.push({
          commentId: comment.id,
          ...comment.data()
        })
      })
    }
  }
}
</script>
