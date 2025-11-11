
<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';
const apiUrl = import.meta.env.VITE_WC_API_URL

const pageId = 371
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
        const heroImage = await getImageUrl(acfData.value.hero_section?.image)
        const ReliableShippingImage = await getImageUrl(acfData.value.reliable_shipping?.image)
        const choose1Icon = await getImageUrl(acfData.value.why_choose_us?.section_1?.icon)
        const choose2Icon = await getImageUrl(acfData.value.why_choose_us?.section_2?.icon)
        const choose3Icon = await getImageUrl(acfData.value.why_choose_us?.section_3?.icon)
        const choose4Icon = await getImageUrl(acfData.value.why_choose_us?.section_4?.icon)
        const meetTeamImage = await getImageUrl(acfData.value.meet_the_team?.image)
        const missionIcon = await getImageUrl(acfData.value.meet_the_team?.mission?.icon)
        const valueIcon = await getImageUrl(acfData.value.meet_the_team?.value?.icon)

        acfImages.value = {
            heroImage,
            ReliableShippingImage,
            choose1Icon,
            choose2Icon,
            choose3Icon,
            choose4Icon,
            meetTeamImage,
            missionIcon,
            valueIcon,
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

            <!-- <section class="bg-[url('/images/bg-banner.jpg')] md:bg-center bg-[60%_20%]"> -->
            <section class="md:bg-center bg-[60%_20%] bg-no-repeat"
                :style="{ backgroundImage: `url(${acfImages.heroImage})` }">

                <div class="container-special">
                    <div
                        class="bg_linear_cst flex items-center flex-wrap justify-between xl:pl-[calc((100%_-_1240px)_/_2)] pl-[0]">
                        <div class="w-full lg:max-w-[45%] max-w-[100%] xl:pl-[0] pl-[20px]">
                            <div
                                class="flex flex-col items-start justify-center lg:py-[100px] md:py-[80px] py-[50px] md:pr-[75px] pr-[20px]">
                                <h2
                                    class="text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                    {{ acfData.hero_section?.title }}
                                </h2>
                                <p
                                    class="text-[#FFFFFF] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[14px] mb-[34px]">
                                    {{ acfData.hero_section?.description }}
                                </p>
                            </div>
                        </div>
                        <div class="w-full lg:max-w-[55%] max-w-[100%]">
                            <!-- <img src="/images/service-hero.jpg" class="w-full h-full object-cover" /> -->
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="flex flex-wrap justify-between lg:mt-[100px] mt-[50px] lg:gap-[50px] gap-[50px]">
                        <div class="flex flex-col justify-center w-full lg:max-w-[calc(59%_-25px)] max-w-[100%]">
                            <h2
                                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px] mb-[10px]">
                                <!-- Where Innovation Meets Reliable Shipping -->
                                    {{ acfData.reliable_shipping?.title }}

                            </h2>
                            <p
                                class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                                <!-- At SwiftShip Logistics, we’ve been providing reliable and affordable parcel delivery
                                services to the Springfield area. Our focus on on-time, secure, and flat rate deliveries
                                has
                                earned us the trust of local customers and beyond. -->
                                    {{ acfData.reliable_shipping?.description_1 }}

                            </p>
                            <p
                                class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                                <!-- What started as a small delivery service in Springfield has grown to support a wide
                                range of
                                industries. SwiftShip Logistics delivers customized parcel solutions, ensuring every
                                shipment arrives on time, every time. -->
                                {{ acfData.reliable_shipping?.description_2 }}
                            </p>
                            <div class="flex mt-[39px]">
                                <NuxtLink
                                to="/contact-us"
                                    class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
                                    <!-- Contact Us -->
                                {{ acfData.reliable_shipping?.button }}

                                </NuxtLink>
                            </div>
                        </div>
                        <div class="w-full lg:max-w-[calc(41%_-25px)] max-w-[100%]">
                            <img :src="acfImages?.ReliableShippingImage" class="" />
                        </div>
                    </div>
                </div>
            </section>

            <WhyChooseUs :acfData="acfData" :acfImages="acfImages" />

            <MeetTheTeam :acfData="acfData" :acfImages="acfImages" />

            <div class="py-[50px]"></div>

            <ParcelQuote :acfData="acfData" />

            <FastEasyShipping :acfData="acfData" />

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
