<template>
  <AppAuthFeedbackInfo
    :actionShowAlert="commentShowAlert"
    :actionAlertVariant="commentAlertVariant"
    :actionAlertMessage="commentAlertMessage"
  />
  <div class="p-6">
    <VeeForm :validationSchema="schema" @submit="submitComment" v-if="userLoggedIn">
      <VeeField
        name="comment"
        as="textarea"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
        placeholder="Your comment here..."
      />
      <ErrorMessage class="text-red-600" name="comment" />
      <button
        type="submit"
        class="py-1.5 px-3 rounded text-white bg-green-600 block"
        :disabled="commentInProgress"
      >
        Submit
      </button>
    </VeeForm>
    <slot />
  </div>
</template>

<script>
import AppAuthFeedbackInfo from '../AuthModal/components/AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import { commentsCollection, auth } from '@/includes/firebase.js'
import { mapState } from 'pinia'
import userStore from '@/stores/user/user.js'

export default {
  name: 'CommentForm',
  data() {
    return {
      schema: {
        comment: 'required|min:3'
      },
      commentInProgress: false,
      commentShowAlert: false,
      commentAlertVariant: '',
      commentAlertMessage: ''
    }
  },
  emits: ['updateSongCommentsDb'],
  props: {
    getComments: {
      type: Function,
      required: true
    }
  },
  components: { AppAuthFeedbackInfo },
  computed: {
    ...mapState(userStore, ['userLoggedIn'])
  },
  methods: {
    async submitComment(values, { resetForm }) {
      this.commentShowAlert = true
      this.commentInProgress = true
      this.commentAlertVariant = 'bg-blue-500'
      this.commentAlertMessage = 'Please wait, your comment is being created.'

      try {
        const comment = {
          content: values.comment,
          datePosted: new Date().toString(),
          songId: this.$route.params.id,
          authorName: auth.currentUser.displayName,
          uid: auth.currentUser.uid
        }

        await commentsCollection.add(comment)
      } catch (error) {
        this.commentInProgress = false
        this.commentAlertVariant = 'bg-red-500'
        this.commentAlertMessage = 'An unexpected error occured. Please, try again.'

        console.error(error)

        return
      }
      this.$emit('updateSongCommentsDb')

      this.getComments()

      this.commentInProgress = false
      this.commentAlertVariant = 'bg-green-500'
      this.commentAlertMessage = 'Comment added!'

      resetForm()
    }
  }
}
</script>
