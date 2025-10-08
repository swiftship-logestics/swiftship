<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

</script>

<template>
    <div class="main-content bg-white">

        <GetInTouch />

        

        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <!-- Error state -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div>
    </div>
</template>
