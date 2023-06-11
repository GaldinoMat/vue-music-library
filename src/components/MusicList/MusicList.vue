<template>
  <div class="col-span-2">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">{{ $t('manage.title') }}</span>
        <i class="fa fa-compact-disc float-right text-green-400 text-2xl" />
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
