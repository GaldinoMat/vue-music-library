<template>
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
    @dragend.prevent.stop="changeDrag(false)"
    @dragover.prevent.stop="changeDrag(true)"
    @dragenter.prevent.stop="changeDrag(true)"
    @dragleave.prevent.stop="changeDrag(false)"
    @drop.prevent.stop="uploadFile($event)"
  >
    <h5>{{ $t('manage.uploadDisclaimer') }}</h5>
  </div>
</template>

<script>
export default {
  name: 'DragComponent',
  props: {
    isDraggedOver: Boolean,
    uploadFile: Function
  },
  emits: ['changeDragState'],
  methods: {
    changeDrag(changeBool) {
      this.$emit('changeDragState', changeBool)
    }
  }
}
</script>
