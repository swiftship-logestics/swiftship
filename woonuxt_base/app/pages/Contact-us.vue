//ContactUs
<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';
const apiUrl = import.meta.env.VITE_WC_API_URL

// const { data, pending, error } = await useFetch('/api/page')

const pageId = 141
const acfData = ref({})
const acfImages = ref({})
const pending = ref(true)
const error = ref(null)

// Helper to get image URL from WP media ID
const getImageUrl = async (id) => {
    if (!id) return null
    try {
        const res = await fetch(`${apiUrl}/media/${id}`)
        if (!res.ok) return null
        const data = await res.json()
        return data.source_url
    } catch (e) {
        console.error('Image fetch error:', e)
        return null
    }
}

onMounted(async () => {
    try {
        // 1️⃣ Fetch the page directly from WP REST API
        const res = await fetch(`${apiUrl}/pages/${pageId}`)
        if (!res.ok) throw new Error('Failed to fetch page')

        const data = await res.json()

        acfData.value = data.acf || {}

        // 2️⃣ Fetch related images
        const phoneIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.phone_icon)
        const emailIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.email_icon)
        const locationIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.location_icon)

        acfImages.value = {
            phoneIcon,
            emailIcon,
            locationIcon
        }

        // console.log('ACF Data:::::::::', acfData.value)
        // console.log('ACF Images::::::::', acfImages.value)
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

            <GetInTouch :acfData="acfData" :acfImages="acfImages" />

        </div>



        <!-- Error state -->
        <div v-if="error && !pending"
            class="fixed inset-0 flex items-center justify-center text-red-500 font-semibold bg-white/90 z-50">
            Error: {{ error.message }}
        </div>

        <!-- Loading state -->
        <!-- <div v-if="pending" class="text-center text-gray-500">Loading...</div> -->
        <!-- Error state -->
        <!-- <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div> -->
    </div>
</template>
