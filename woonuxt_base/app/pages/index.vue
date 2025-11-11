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
    const heroImage = await getImageUrl(acfData.value.hero_section?.image)
    const section1 = await getImageUrl(acfData.value.delivery_services_section?.delivery_section_1?.image)
    const section2 = await getImageUrl(acfData.value.delivery_services_section?.delivery_section_2?.image)
    const section3 = await getImageUrl(acfData.value.delivery_services_section?.delivery_section_3?.image)
    const meetTeamImage = await getImageUrl(acfData.value.meet_the_team?.image)
    const missionIcon = await getImageUrl(acfData.value.meet_the_team?.mission?.icon)
    const valueIcon = await getImageUrl(acfData.value.meet_the_team?.value?.icon)
    const choose1Icon = await getImageUrl(acfData.value.why_choose_us?.section_1?.icon)
    const choose2Icon = await getImageUrl(acfData.value.why_choose_us?.section_2?.icon)
    const choose3Icon = await getImageUrl(acfData.value.why_choose_us?.section_3?.icon)
    const choose4Icon = await getImageUrl(acfData.value.why_choose_us?.section_4?.icon)
    const phoneIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.phone_icon)
    const emailIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.email_icon)
    const locationIcon = await getImageUrl(acfData.value.get_in_touch?.lets_connected?.location_icon)

    acfImages.value = {
      heroImage,
      section1,
      section2,
      section3,
      meetTeamImage,
      missionIcon,
      valueIcon,
      choose1Icon,
      choose2Icon,
      choose3Icon,
      choose4Icon,
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

// 3️⃣ Build delivery services dynamically
const services = computed(() => {
  const section = acfData.value.delivery_services_section
  if (!section) return []

  return [
    {
      icon: acfImages.value.section1,
      title: section.delivery_section_1?.title,
      highlight: section.delivery_section_1?.sub_title,
      description: section.delivery_section_1?.description
    },
    {
      icon: acfImages.value.section2,
      title: section.delivery_section_2?.title,
      highlight: section.delivery_section_2?.sub_title,
      description: section.delivery_section_2?.description
    },
    {
      icon: acfImages.value.section3,
      title: section.delivery_section_3?.title,
      highlight: section.delivery_section_3?.sub_title,
      description: section.delivery_section_3?.description
    }
  ]
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
      <section>
        <div class="container">
          <div class="flex md:flex-nowrap gap-[40px] flex-wrap justify-between pt-[17px]">
            <div class="flex flex-col justify-center max-w-[484px]">
              <h1
                class="text-[#161616] font-[PingLCG] font-[800] lg:text-[54px] md:text-[34px] text-[34px] lg:leading-[66px] md:leading-[49px] leading-[46px]">
                {{ acfData.hero_section?.title }}
              </h1>
              <p
                class="text-[#141416] font-[Avenir] font-[400] lg:text-[20px] text-[18px] lg:leading-[34px] leading-[28px] lg:mt-[22px] mt-[18px] lg:mb-[38px] mb-[18px] pr-[20px]">
                {{ acfData.hero_section?.description }}
              </p>
              <div class="flex md:flex-row flex-col gap-[13px]">
                <NuxtLink to="/getquote"
                  class="bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] md:text-[16px] text-[15px] leading-normal lg:px-[36px] px-[26px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer text-center">
                  {{ acfData.hero_section?.button_1 }}
                </NuxtLink>
                <NuxtLink to="/tracking"
                  class="hover:bg-[#248BC6] hover:text-white rounded-[6px] font-[PingLCG] font-[500] md:text-[16px] text-[15px] leading-normal px-[36px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border hover:border-[#248BC6] bg-white border-[#14141633] text-[#141416] cursor-pointer text-center">
                  {{ acfData.hero_section?.button_2 }}
                </NuxtLink>
              </div>
            </div>
            <div>
              <img :src="acfImages?.heroImage" class="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <CalculatePrice />

      <section id="services" class="bg-[#FAFAFA] lg:mt-[100px] mt-[50px]">
        <div class="container">
          <div class="lg:py-[100px] py-[50px] w-full">
            <h2
              class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
              {{ acfData.delivery_services_section?.title }}
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

      <MeetTheTeam :acfData="acfData" :acfImages="acfImages" />

      <WhyChooseUs :acfData="acfData" :acfImages="acfImages" />

      <ParcelQuote :acfData="acfData" />

      <FastEasyShipping :acfData="acfData" />

      <FAQSection :acfData="acfData" />

      <GetInTouch :acfData="acfData" :acfImages="acfImages" />

    </div>



    <!-- Error state -->
    <div v-if="error && !pending"
      class="fixed inset-0 flex items-center justify-center text-red-500 font-semibold bg-white/90 z-50">
      Error: {{ error.message }}
    </div>

    <!-- Page content -->
    <!-- <div v-if="data" class="prose prose-lg mx-auto text-gray-700">
      <h2 class="text-2xl font-semibold mb-4">{{ data.title.rendered }}</h2>
      <div v-html="data.content.rendered"></div>
    </div> -->
  </div>
</template>
