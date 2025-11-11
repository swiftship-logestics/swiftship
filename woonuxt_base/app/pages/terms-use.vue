//TermsUse.vue
<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
const apiUrl = import.meta.env.VITE_WC_API_URL
const pageId = 522 
const pageContent = ref('')
const pending = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`${apiUrl}/pages/${pageId}`)
    if (!res.ok) throw new Error('Failed to fetch page')
    const data = await res.json()
    pageContent.value = data.content.rendered
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    pending.value = false
  }
})
</script>

<template>
  <div class="main-content bg-white">
    <!-- Loader Overlay -->
        <div v-if="pending" class="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-[#248BC6] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-[#248BC6] font-semibold mt-4 text-lg">Loading...</p>
          </div>
        </div>
        <div v-else>
    <section class="policies_text container-terms">
      <!-- <div v-if="pending" class="text-center text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500 font-semibold">
        Error: {{ error.message }}
      </div> -->
      <div  v-html="pageContent"></div>
    </section>
    </div>



    <!-- Error state -->
    <div v-if="error && !pending"
      class="fixed inset-0 flex items-center justify-center text-red-500 font-semibold bg-white/90 z-50">
      Error: {{ error.message }}
    </div>
  </div>
</template>
