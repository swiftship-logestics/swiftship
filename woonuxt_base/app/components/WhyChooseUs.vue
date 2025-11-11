<script setup lang="ts">


import { computed } from 'vue'

const props = defineProps<{
  acfData?: any,
  acfImages?: any
}>()


const chooses = computed(() => {
  const section = props.acfData?.why_choose_us
  if (!section) return []

  const items = [
    {
      icon: props.acfImages?.choose1Icon,
      title: section.section_1?.title,
      description: section.section_1?.description
    },
    {
      icon: props.acfImages?.choose2Icon,
      title: section.section_2?.title,
      description: section.section_2?.description
    },
    {
      icon: props.acfImages?.choose3Icon,
      title: section.section_3?.title,
      description: section.section_3?.description
    },
    {
      icon: props.acfImages?.choose4Icon,
      title: section.section_4?.title,
      description: section.section_4?.description
    }
  ]
  return items.filter(item => item.title || item.description || item.icon)
})


</script>

<template>
  <section>
    <div class="container">
      <div class="bg-[#fff] py-[50px] md:py-[100px] w-full">
        <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
          {{ acfData.why_choose_us?.title }}
        </h2>

        <div class="flex gap-[20px] flex-wrap mt-[40px] w-full">
          <div v-for="(choose, index) in chooses" :key="index"
            class="bg-[#F3F3F3] border border-[#F3F3F3] rounded-[10px] px-[30px] py-[40px] pb-[35px] w-full lg:max-w-[calc(25%_-_15px)] md:max-w-[calc(50%_-_10px)] max-w-[100%]">


            <div class="">
              <img :src="choose.icon" class="max-w-[60px]" />
              <h3
                class="text-[#141416] font-[PingLCG] font-[800] lg:text-[24px] text-[20px] leading-[normal] mt-[25px]">
                {{ choose.title }}
              </h3>
              <p class="text-[#141416] font-[Avenir] font-[400] lg:text-[18px] text-[16px] leading-[29px] mt-[18px]">
                {{ choose.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
