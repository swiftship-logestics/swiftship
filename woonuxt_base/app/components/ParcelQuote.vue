<script setup>
import { NuxtLink } from '#components';
const props = defineProps({
  acfData: Object
})


const descriptionWithSpans = computed(() => {
  const desc = props.acfData.parcel_quote?.description || ''

  // Split description into words
  const words = desc.split(' ')

  // Wrap 2nd and 3rd word in span
  words.forEach((word, index) => {
    if (index === 1 || index === 2) {
      words[index] = `<span class="text-[#141416]">${word}</span>`
    }
  })

  // Join back to string
  return words.join(' ')
})

</script>

<template>
    <section class="bg-[#248BC6] lg:py-[90px] py-[50px] w-full">
      <div class="container">
        <div class="flex flex-col items-center justify-center mx-auto max-w-[800px]">
          <p class="text-[#FFFFFF] font-[Avenir] font-[700] md:text-[18px] text-[16px] leading-[30px] mt-[18px] uppercase">
           {{ acfData.parcel_quote?.title  }}
          </p>
          <!-- <h2 class="mt-[10px] text-center text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[48px] md:text-[40px] text-[30px] lg:leading-[66px] md:leading-[56px] leading-[46px]">
            Your <span class="text-[#141416]">Parcel Quote</span> is Ready - Just a Click Away to Book.
          </h2> -->
           <h2
          class="mt-[10px] text-center text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[48px] md:text-[40px] text-[30px] lg:leading-[66px] md:leading-[56px] leading-[46px]"
          v-html="descriptionWithSpans"
        ></h2>
          <NuxtLink
          to="/getquote"
            class="px-4 py-2 bg-transparent text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] md:px-[30px] px-[26px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#ffffff30] hover:bg-white hover:border-[#fff] hover:text-[#141416] cursor-pointer mt-[25px]">
            {{ acfData.parcel_quote?.button }}
          </NuxtLink>
        </div>
      </div>
    </section>
</template>
