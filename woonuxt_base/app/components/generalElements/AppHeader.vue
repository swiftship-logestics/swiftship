<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white border-b border-[#F3F3F3] overflow-hidden">
    <div class="container">
      <MainMenu class="w-full"/> 
    </div>
    <!-- <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition> -->
  </header>
</template>
