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

<script>
import AppAuthFeedbackInfo from '../../../AuthModal/components/AuthFeedbackInfo/AppAuthFeedbackInfo.vue'
import { songsCollection, storage } from '@/includes/firebase.js'

export default {
  name: 'MusicCompositionItem',
  data() {
    return {
      showForm: false,
      schema: {
        SongTitle: 'required',
        SongGenre: 'alphaSpaces'
      },
      songData: {
        SongTitle: this.song.modifiedName,
        SongGenre: this.song.genre
      },
      editInSubmission: false,
      editShowAlert: false,
      editAlertVariant: '',
      editAlertMessage: ''
    }
  },
  props: {
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
  },
  components: { AppAuthFeedbackInfo },
  methods: {
    async editMusic(values) {
      this.editInSubmission = true
      this.editShowAlert = true
      this.editAlertVariant = 'bg-blue-500'
      this.editAlertMessage = 'Please wait! Updating song info.'

      try {
        await songsCollection.doc(this.song.docId).update({
          modifiedName: values.SongTitle,
          genre: values.SongGenre
        })
      } catch (error) {
        this.editInSubmission = false
        this.editShowAlert = false
        this.editAlertVariant = 'bg-red-500'
        this.editAlertMessage = 'Something went wrong! Please try again later.'

        console.error(error)

        return
      }

      this.updateSong(this.index, values)
      this.updateFlag(false)

      this.editInSubmission = false
      this.editAlertVariant = 'bg-green-500'
      this.editAlertMessage = 'Success!'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.originalName}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docId).delete()

      this.removeSong(this.index)
    },
    resetCompositionItem() {
      this.showForm = false
      this.editShowAlert = false
    }
  }
}
</script>
