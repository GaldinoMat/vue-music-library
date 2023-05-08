<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <!-- 
        Component with drag and drop listeners
        drag: applied for when the element is being dragged
        dragstart: applied for when the element starts to be dragged
        dragend: applied for when the element is not being dragged anymore
        dragover: applied for when the user is hovering something over the component with this event
        dragenter: applied for when the user begins to drag something over the element
        dragleave: applied for when the element that was being dragged over the element is not longer over it
        drop: when the element that was dragged is released
      -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid text-white': isDraggedOver }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDraggedOver = false"
        @dragover.prevent.stop="isDraggedOver = true"
        @dragenter.prevent.stop="isDraggedOver = true"
        @dragleave.prevent.stop="isDraggedOver = false"
        @drop.prevent.stop="uploadFile($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bar -->
      <div v-for="upload in uploads" :key="upload.name" class="mb-4">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textClass">
          <i :class="upload.icon" />
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: `${upload.currentProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/includes/firebase.js'

export default {
  name: 'MusicUpload',
  data() {
    return {
      isDraggedOver: false,
      uploads: []
    }
  },
  methods: {
    uploadFile(fileEvent) {
      this.isDraggedOver = false

      const files = [...fileEvent.dataTransfer.files]

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
          (error) => {
            this.uploads[uploadIndex].variant = 'bg-red-400'
            this.uploads[uploadIndex].icon = 'fas fa-times'
            this.uploads[uploadIndex].textClass = 'text-red-400'

            console.log(error);
          },
          () => {
            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'fas fa-check'
            this.uploads[uploadIndex].textClass = 'text-green-400'
          }
        )
      })
    }
  }
}
</script>
