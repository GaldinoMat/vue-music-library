<template>
  <section class="container mx-auto mt-6" id="comments">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">{{
          $tc('song.commentCount', commentCount, { count: commentCount })
        }}</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl" />
      </div>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommentSection',
  props: {
    commentCount: {
      type: undefined,
      required: true
    }
  }
}
</script>
