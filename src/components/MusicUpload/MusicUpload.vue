<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl" />
    </div>
    <div class="p-6">
      <DragComponent
        @changeDragState="changeDragState"
        :isDraggedOver="isDraggedOver"
        :uploadFile="uploadFile"
      />
      <input type="file" multiple @change="uploadFile($event)" />
      <hr class="my-6" />
      <ProgressBar :uploads="uploads" />
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase.js'
import ProgressBar from './components/ProgressBar/ProgressBar.vue'
import DragComponent from './components/DragComponent/DragComponent.vue'

export default {
  name: 'MusicUpload',
  data() {
    return {
      isDraggedOver: false,
      uploads: []
    }
  },
  props: {
    addSong: {
      type: Function,
      required: true
    }
  },
  components: { ProgressBar, DragComponent },
  methods: {
    changeDragState(newsState) {
      this.isDraggedOver = newsState
    },
    uploadFile(fileEvent) {
      this.isDraggedOver = false

      const files = fileEvent.dataTransfer
        ? [...fileEvent.dataTransfer.files]
        : [...fileEvent.target.files]

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return
        }

        const reference = storage.ref()
        const songsReference = reference.child(`songs/${file.name}`)

        const task = songsReference.put(file)

        const uploadIndex =
          this.uploads.push({
            task,
            currentProgress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            textClass: ''
          }) - 1

        task.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploads[uploadIndex].currentProgress = progress
          },
          () => {
            this.uploads[uploadIndex].variant = 'bg-red-400'
            this.uploads[uploadIndex].icon = 'fas fa-times'
            this.uploads[uploadIndex].textClass = 'text-red-400'
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: '',
              commentCount: 0
            }

            song.url = await task.snapshot.ref.getDownloadURL()

            const songRef = await songsCollection.add(song)

            const songSnapshot = await songRef.get()

            this.addSong(songSnapshot)

            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'fas fa-check'
            this.uploads[uploadIndex].textClass = 'text-green-400'
          }
        )
      })
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel()
      })
    }
  },
  // Lifecycle methods used to safeguard for upload cancel
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>
