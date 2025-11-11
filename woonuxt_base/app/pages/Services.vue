<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';
const apiUrl = import.meta.env.VITE_WC_API_URL

const pageId = 257
const acfData = ref({})
const acfImages = ref({})
const services = ref([])
const guidlines = ref([])
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
        const domesticDeliveryImage = await getImageUrl(acfData.value.domestic_delivery?.image)
        const sizeWeightImage = await getImageUrl(acfData.value.size_and_weight?.image)
        const domesticShippingImage = await getImageUrl(acfData.value.reliable_domestic_shipping?.image)
        const keyFeature1Image = await getImageUrl(acfData.value.key_features.section_1?.image)
        const keyFeature2Image = await getImageUrl(acfData.value.key_features.section_2?.image)
        const keyFeature3Image = await getImageUrl(acfData.value.key_features.section_1?.image)
        const servicesAreaImage = await getImageUrl(acfData.value.services_area?.image)

        acfImages.value = {
            domesticDeliveryImage,
            sizeWeightImage,
            domesticShippingImage,
            keyFeature1Image,
            keyFeature2Image,
            keyFeature3Image,
            servicesAreaImage
        }

        services.value = [
            {
                icon: keyFeature1Image,
                title: acfData.value.key_features?.section_1?.heading,
                highlight: acfData.value.key_features?.section_1?.title,
                description: acfData.value.key_features?.section_1?.description
            },
            {
                icon: keyFeature2Image,
                title: acfData.value.key_features?.section_2?.heading,
                highlight: acfData.value.key_features?.section_2?.title,
                description: acfData.value.key_features?.section_2?.description
            },
            {
                icon: keyFeature3Image,
                title: acfData.value.key_features?.section_3?.heading,
                highlight: acfData.value.key_features?.section_3?.title,
                description: acfData.value.key_features?.section_3?.description
            }
        ]


        guidlines.value = [
            {
                title: acfData.value.packing_guidelines?.guideline_1?.title,
                description: acfData.value.packing_guidelines?.guideline_1?.description,
            },
            {
                title: acfData.value.packing_guidelines?.guideline_2?.title,
                description: acfData.value.packing_guidelines?.guideline_2?.description,
            },
            {
                title: acfData.value.packing_guidelines?.guideline_3?.title,
                description: acfData.value.packing_guidelines?.guideline_3?.description,
            },
            {
                title: acfData.value.packing_guidelines?.guideline_4?.title,
                description: acfData.value.packing_guidelines?.guideline_4?.description,
            },
            {
                title: acfData.value.packing_guidelines?.guideline_4?.title,
                description: acfData.value.packing_guidelines?.guideline_4?.description,
            },
            {
                title: acfData.value.packing_guidelines?.guideline_5?.title,
                description: acfData.value.packing_guidelines?.guideline_5?.description,
            }
        ]

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

            <section class="bg-[#248BC6]">
                <div class="container-special">
                    <div class="flex flex-wrap justify-between xl:pl-[calc((100%_-_1240px)_/_2)] pl-[0]">
                        <div class="w-full lg:max-w-[45%] max-w-[100%] xl:pl-[0] pl-[20px]">
                            <div
                                class="flex flex-col items-start justify-center lg:py-[100px] md:py-[80px] py-[50px] md:pr-[75px] pr-[20px]">
                                <h2
                                    class="text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                    {{ acfData.domestic_delivery?.title }}
                                </h2>
                                <p
                                    class="text-[#FFFFFF] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[14px] mb-[34px]">
                                    {{ acfData.domestic_delivery?.description }}
                                </p>
                                <NuxtLink to="/getquote"
                                    class="px-4 py-2 bg-[#fff] text-[#248BC6] rounded-[6px] font-[PingLCG] font-[700] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#fff] hover:bg-transparent hover:border-[#fff] hover:text-[#fff] cursor-pointer">
                                    {{ acfData.domestic_delivery?.button }}
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="w-full lg:max-w-[55%] max-w-[100%]">
                            <img :src="acfImages.domesticDeliveryImage" alt="Domestic Delivery"
                                class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <CalculatePrice />

            <section class="bg-[#FAFAFA] lg:mt-[100px] mt-[50px]">
                <div class="container">
                    <div class="flex flex-wrap justify-between lg:py-[80px] py-[40px] lg:gap-[100px] gap-[50px]">
                        <div class="flex flex-col justify-center w-full lg:max-w-[calc(55%_-50px)] max-w-[100%]">
                            <h2
                                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                {{ acfData.size_and_weight?.title }}
                            </h2>
                            <ul class="list-disc pl-[20px] mt-[10px]">
                                <li
                                    class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                    {{ acfData.size_and_weight?.list_1 }}
                                </li>
                                <li
                                    class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                    {{ acfData.size_and_weight?.list_2 }}
                                </li>
                                <li
                                    class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                    {{ acfData.size_and_weight?.list_3 }}
                                </li>
                            </ul>
                        </div>
                        <div class="w-full lg:max-w-[calc(45%_-50px)] max-w-[100%] text-center">
                            <img :src="acfImages.sizeWeightImage" class="mx-auto" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="flex flex-wrap justify-between lg:mt-[100px] mt-[50px] lg:gap-[50px] gap-[50px]">
                        <div class="w-full lg:max-w-[calc(45%_-25px)] max-w-[100%]">
                            <img :src="acfImages.domesticShippingImage" class="" />
                        </div>
                        <div class="flex flex-col justify-center w-full lg:max-w-[calc(55%_-25px)] max-w-[100%]">
                            <h2
                                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px] mb-[10px]">
                                {{ acfData.reliable_domestic_shipping?.title }}
                            </h2>
                            <p
                                class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                                {{ acfData.reliable_domestic_shipping?.description_1 }}
                            </p>
                            <p
                                class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                                {{ acfData.reliable_domestic_shipping?.description_2 }}
                            </p>
                            <div class="flex mt-[39px]">
                                <NuxtLink
                                to="/getquote"
                                    class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
                                    {{ acfData.reliable_domestic_shipping?.button }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-[#FAFAFA] lg:mt-[100px] mt-[50px]">
                <div class="container">
                    <div class="lg:py-[100px] py-[50px] w-full">
                        <h2
                            class="text-[#141416] text-center font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
                            {{ acfData.key_features?.title || "Key Features" }}
                        </h2>

                        <div class="flex gap-[20px] flex-wrap md:mt-[40px] mt-[30px] w-full">
                            <div v-for="(service, index) in services" :key="index"
                                class="bg-[#FFFFFF] border border-[#00000026] rounded-[10px] md:px-[24px] px-[20px] md:py-[54px] py-[40px] w-full lg:max-w-[calc(33.33%_-_13.33px)] md:max-w-[calc(50%_-_10px)] max-w-[100%]">
                                <div class="text-center">
                                    <img :src="service.icon" class="mx-auto" />
                                    <h3
                                        class="text-[#141416] font-[PingLCG] font-[800] md:text-[24px] text-[20px] leading-[normal] md:mt-[40px] mt-[30px]">
                                        {{ service.title }}
                                    </h3>
                                </div>

                                <div class="w-full md:mt-[50px] mt-[40px]">
                                    <div class="flex gap-[12px]">
                                        <img src="/images/check_circle.svg" />
                                        <span
                                            class="block text-[#141416] font-[PingLCG] font-[700] md:text-[18px] text-[16px] leading-[normal]">
                                            {{ service.highlight }}
                                        </span>
                                    </div>
                                    <p
                                        class="pl-[29px] text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">
                                        {{ service.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ParcelQuote :acfData="acfData" />

            <section class="bg-[#FAFAFA] md:py-[80px] py-[50px]">
                <div class="container">
                    <div>
                        <div class="text-center">
                            <h2
                                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[29px] lg:leading-[66px] md:leading-[56px] leading-[36px] md:mt-[0] mt-[15px]">
                                {{ acfData.packing_guidelines?.heading }}
                            </h2>
                        </div>
                        <div>
                            <div class="flex gap-[20px] flex-wrap md:mt-[40px] mt-[30px] w-full">
                                <div v-for="(guidline, index) in guidlines" :key="index"
                                    class="bg-[#FFFFFF] border border-[#00000026] rounded-[7px] md:px-[25px] px-[20px] md:py-[30px] py-[25px] w-full lg:max-w-[calc(33.33%_-_13.33px)] md:max-w-[calc(50%_-_10px)] max-w-[100%]">
                                    <div class="">
                                        <h3
                                            class="text-[#000000] font-[PingLCG] font-[700] md:text-[18px] text-[16px] leading-[normal]">
                                            {{ guidline.title }}
                                        </h3>
                                        <p
                                            class="text-[#000000] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[24px] mt-[10px]">
                                            {{ guidline.description }}
                                        </p>
                                    </div>
                                </div>

                                <div class="w-full text-center mt-[25px]">
                                    <NuxtLink
                                        class="inline-block px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] md:px-[30px] px-[26px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#fff] hover:text-[#141416] cursor-pointer">
                                        {{ acfData.packing_guidelines?.button }}
                                    </NuxtLink>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection :acfData="acfData" />

            <section class="bg-[#FAFAFA] md:py-[100px] py-[50px]">
                <div class="container">
                    <div class="flex flex-wrap justify-between lg:gap-[60px] gap-[40px]">
                        <div class="w-full lg:max-w-[calc(50%_-30px)] max-w-[100%]">
                            <img :src="acfImages.servicesAreaImage" class="rounded-[12px]" />
                        </div>
                        <div class="flex flex-col justify-center w-full lg:max-w-[calc(50%_-30px)] max-w-[100%]">
                            <h2
                                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px] mb-[10px]">
                                {{ acfData.services_area?.title }}
                            </h2>
                            <p
                                class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                                {{ acfData.services_area?.description }}
                            </p>
                            <ul
                                class="w-full flex flex-col md:max-h-[180px] max-h-[none] flex-wrap mt-[30px] gap-y-[20px]">
                                <li v-for="(area, index) in Object.values(acfData.services_area?.area || {})"
                                    :key="index"
                                    class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]">
                                    <NuxtLink class="cursor-pointer underline">{{ area }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>



        <!-- Error state -->
        <div v-if="error && !pending"
            class="fixed inset-0 flex items-center justify-center text-red-500 font-semibold bg-white/90 z-50">
            Error: {{ error.message }}
        </div>
    </div>
</template>
