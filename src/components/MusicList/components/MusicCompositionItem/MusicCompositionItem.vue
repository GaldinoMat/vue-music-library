<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times" @click.prevent="deleteSong" />
      </button>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
        <i class="fa fa-pencil-alt" @click.prevent="showForm = !showForm" />
      </button>
    </div>
    <div v-show="showForm">
      <AppAuthFeedbackInfo
        :actionShowAlert="editShowAlert"
        :actionAlertVariant="editAlertVariant"
        :actionAlertMessage="editAlertMessage"
      />
      <VeeForm :validationSchema="schema" :initial-values="songData" @submit="editMusic">
        <div class="mb-3">
          <label class="inline-block mb-2">
            {{ $t('manage.editSongTitle') }}
          </label>
          <VeeField
            type="text"
            name="SongTitle"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('manage.editSongTitlePlaceholder')"
            @input="updateFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="SongTitle" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">
            {{ $t('manage.genre') }}
          </label>
          <VeeField
            type="text"
            name="SongGenre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('manage.editGenrePlaceholder')"
            @input="updateFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="SongGenre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="editInSubmission"
        >
          {{ $t('manage.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="resetCompositionItem"
          :disabled="editInSubmission"
        >
          {{ $t('manage.back') }}
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import AppAuthFeedbackInfo from '../../../AuthModal/components/AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import { songsCollection, storage } from '@/includes/firebase.js'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  updateSong: {
    type: Function,
    required: true
  },
  removeSong: {
    type: Function,
    required: true
  },
  updateFlag: {
    type: Function,
    required: true
  }
})

let showForm = ref(false)
const schema = {
  SongTitle: 'required',
  SongGenre: 'alphaSpaces'
}
const songData = reactive({
  SongTitle: props.song.modifiedName,
  SongGenre: props.song.genre
})

let editInSubmission = ref(false)
let editShowAlert = ref(false)
let editAlertVariant = ref('')
let editAlertMessage = ref('')

const editMusic = async (values) => {
  editInSubmission.value = true
  editShowAlert.value = true
  editAlertVariant.value = 'bg-blue-500'
  editAlertMessage.value = 'Please wait! Updating song info.'

  try {
    await songsCollection.doc(props.song.docId).update({
      modifiedName: values.SongTitle,
      genre: values.SongGenre
    })
  } catch (error) {
    editInSubmission.value = false
    editShowAlert.value = false
    editAlertVariant.value = 'bg-red-500'
    editAlertMessage.value = 'Something went wrong! Please try again later.'

    console.error(error)

    return
  }

  props.updateSong(props.index, values)
  props.updateFlag(false)

  editInSubmission = false
  editAlertVariant = 'bg-green-500'
  editAlertMessage = 'Success!'
}
const deleteSong = async () => {
  const storageRef = storage.ref()
  const songRef = storageRef.child(`songs/${song.originalName}`)

  await songRef.delete()

  await songsCollection.doc(song.docId).delete()

  props.removeSong(props.index)
}
const resetCompositionItem = () => {
  showForm.value = false
  editShowAlert.value = false
}
</script>
