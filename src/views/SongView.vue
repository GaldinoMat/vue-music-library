<template>
  <!-- Music Header -->
  <MusicHeader :song="song" />
  <!-- Comments -->
  <CommentSection :commentCount="song.commentCount">
    <!-- Form -->
    <CommentForm :getComments="getComments" @updateSongCommentsDb="updateSongCommentsDb">
      <!-- Sort Comments -->
      <SortingComponent @changeSort="changeSort" />
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
</template>

<script>
import { songsCollection, commentsCollection } from '@/includes/firebase.js'
import CommentSection from '@/components/CommentSection/CommentSection.vue'
import CommentListItem from '@/components/CommentListItem/CommentListItem.vue'
import MusicHeader from '@/components/MusicHeader/MusicHeader.vue'
import CommentForm from '@/components/CommentForm/CommentForm.vue'
import SortingComponent from '@/components/SortingComponent/SortingComponent.vue'

export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      comments: [],
      sort: 'latest'
    }
  },
  components: {
    CommentSection,
    CommentListItem,
    MusicHeader,
    CommentForm,
    SortingComponent
  },
  computed: {
    sortedComments() {
      return this.comments
        .slice()
        .sort((a, b) =>
          this.sort === 'latest'
            ? new Date(b.datePosted) - new Date(a.datePosted)
            : new Date(a.datePosted) - new Date(b.datePosted)
        )
    }
  },
  async created() {
    const songSnapshot = await songsCollection.doc(this.$route.params.id).get()

    if (!songSnapshot.exists) {
      this.$router.push({ name: 'Home' })
      return
    }

    const { sort } = this.$route.query

    this.sort = sort === 'latest' || sort === 'oldest' ? sort : 'latest'

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
        this.comments.push({
          commentId: comment.id,
          ...comment.data()
        })
      })
    },
    changeSort(newValue) {
      this.sort = newValue
    },
    async updateSongCommentsDb() {
      this.song.commentCount += 1

      console.log(this.song.commentCount)

      await songsCollection.doc(this.$route.params.id).update({
        commentCount: this.song.commentCount
      })
    }
  },
  watch: {
    sort(newValue) {
      if (newValue === this.$route.query.sort) return

      this.$router.push({
        query: {
          sort: newValue
        }
      })
    }
  }
}
</script>
