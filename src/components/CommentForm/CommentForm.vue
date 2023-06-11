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
        :placeholder="$t(`song.commentPlaceholder`)"
      />
      <ErrorMessage class="text-red-600" name="comment" />
      <button
        type="submit"
        class="py-1.5 px-3 rounded text-white bg-green-600 block"
        :disabled="commentInProgress"
      >
        {{ $t('song.submit') }}
      </button>
    </VeeForm>
    <slot />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppAuthFeedbackInfo from '../AuthModal/components/AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import { commentsCollection, auth } from '@/includes/firebase.js'
import userStore from '@/stores/User/user.js'

const props = defineProps({
  getComments: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['update-song-comments-db'])

const schema = { comment: 'required|min:3' }
let commentInProgress = ref(false)
let commentShowAlert = ref(false)
let commentAlertVariant = ref('')
let commentAlertMessage = ref('')

const route = useRoute()

const userLoggedIn = computed(() => userStore().userLoggedIn)

const submitComment = async (values, { resetForm }) => {
  commentShowAlert.value = true
  commentInProgress.value = true
  commentAlertVariant.value = 'bg-blue-500'
  commentAlertMessage.value = 'Please wait, your comment is being created.'

  try {
    const comment = {
      content: values.comment,
      datePosted: new Date().toString(),
      songId: route.params.id,
      authorName: auth.currentUser.displayName,
      uid: auth.currentUser.uid
    }

    await commentsCollection.add(comment)
  } catch (error) {
    commentInProgress.value = false
    commentAlertVariant.value = 'bg-red-500'
    commentAlertMessage.value = 'An unexpected error occured. Please, try again.'

    console.error(error)

    return
  }

  emit('update-song-comments-db')

  props.getComments()

  commentInProgress.value = false
  commentAlertVariant.value = 'bg-green-500'
  commentAlertMessage.value = 'Comment added!'

  resetForm()
}
</script>
