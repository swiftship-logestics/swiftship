<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

const services = [
  {
    icon: "/images/line-d-icons.svg",
    title: "Domestic Delivery",
    highlight: "Send upto 10kg",
    description: "Choose from our convenient satchel sizes - 1kg, 3kg, or 5kg - to suit your parcel and shipping needs."
  },
  {
    icon: "/images/line-d-icon2.svg",
    title: "Express Delivery",
    highlight: "Most popular quotes",
    description: "Select from Next-Day, Priority, or Standard service options to match your delivery needs."
  },
  {
    icon: "/images/line-d-icon3.svg",
    title: "Bulk & Business",
    highlight: "Send upto 500kg",
    description: "Send up to 10 items in a single shipment, making it easy to manage multiple parcels."
  }
]

</script>


<template>
  <div class="main-content bg-white">

    <section>
      <div class="container">
        <div class="flex md:flex-nowrap gap-[40px] flex-wrap justify-between pt-[17px]">
          <div class="flex flex-col justify-center max-w-[484px]">
            <h1 class="text-[#161616] font-[PingLCG] font-[800] lg:text-[54px] md:text-[34px] text-[34px] lg:leading-[66px] md:leading-[49px] leading-[46px]">
              Swift, Reliable, Next-Day Parcel Delivery
            </h1>
            <p class="text-[#141416] font-[Avenir] font-[400] lg:text-[20px] text-[18px] lg:leading-[34px] leading-[28px] lg:mt-[22px] mt-[18px] lg:mb-[38px] mb-[18px] pr-[20px]">
              Send parcels across the country with confidence fast, affordable, and trackable.
            </p>
            <div class="flex md:flex-row flex-col gap-[13px]">
              <NuxtLink
                 to="/getquote"
                class="bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] md:text-[16px] text-[15px] leading-normal lg:px-[36px] px-[26px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer text-center">
                Get a Quote
              </NuxtLink>
              <NuxtLink
              to="/tracking"
                class="hover:bg-[#248BC6] hover:text-white rounded-[6px] font-[PingLCG] font-[500] md:text-[16px] text-[15px] leading-normal px-[36px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border hover:border-[#248BC6] bg-white border-[#14141633] text-[#141416] cursor-pointer text-center">
                Track Shipment
              </NuxtLink>
            </div>
          </div>
          <div>
            <img src="/images/sec-1img.png" class="" />
          </div>
        </div>
      </div>
    </section>

    <CalculatePrice />

    <section id="services"  class="bg-[#FAFAFA] lg:mt-[100px] mt-[50px]">
      <div class="container">
        <div class="lg:py-[100px] py-[50px] w-full">
          <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
            Our Delivery Services
          </h2>

          <div class="flex gap-[20px] flex-wrap md:mt-[40px] mt-[30px] w-full">
            <div v-for="(service, index) in services" :key="index"
              class="bg-[#FFFFFF] border border-[#00000026] rounded-[10px] md:px-[24px] px-[20px] md:py-[54px] py-[40px] w-full lg:max-w-[calc(33.33%_-_13.33px)] md:max-w-[calc(50%_-_10px)] max-w-[100%]">
              <div class="text-center">
                <img :src="service.icon" class="mx-auto" />
                <h3 class="text-[#141416] font-[PingLCG] font-[800] md:text-[24px] text-[20px] leading-[normal] md:mt-[40px] mt-[30px]">
                  {{ service.title }}
                </h3>
              </div>

              <div class="w-full md:mt-[50px] mt-[40px]">
                <div class="flex gap-[12px]">
                  <img src="/images/check_circle.svg" />
                  <span class="block text-[#141416] font-[PingLCG] font-[700] md:text-[18px] text-[16px] leading-[normal]">
                    {{ service.highlight }}
                  </span>
                </div>
                <p class="pl-[29px] text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">
                  {{ service.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <MeetTheTeam />

    <WhyChooseUs />

    <ParcelQuote />

    <FastEasyShipping />

    <FAQSection />

    <GetInTouch />


    <!-- Loading state -->
    <div v-if="pending" class="text-center text-gray-500">Loading...</div>
    <!-- Error state -->
    <div v-if="error" class="text-center text-red-500 font-semibold">
      Error: {{ error.message }}
    </div>

    <!-- Page content -->
    <!-- <div v-if="data" class="prose prose-lg mx-auto text-gray-700">
      <h2 class="text-2xl font-semibold mb-4">{{ data.title.rendered }}</h2>
      <div v-html="data.content.rendered"></div>
    </div> -->
  </div>
</template>
