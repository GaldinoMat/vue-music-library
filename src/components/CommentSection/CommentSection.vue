<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <CommentForm />
    </div>
  </section>
</template>

<script>
import CommentForm from './components/CommentForm/CommentForm.vue'

export default {
  name: 'CommentSection',
  components: {
    CommentForm
  }
}
</script>
