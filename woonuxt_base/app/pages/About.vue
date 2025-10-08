<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

</script>

<template>
    <div class="main-content bg-white">

        <section class="bg-[url('/images/bg-banner.jpg')] md:bg-center bg-[60%_20%]">
            <div class="container-special">
                <div
                    class="bg_linear_cst flex items-center flex-wrap justify-between xl:pl-[calc((100%_-_1240px)_/_2)] pl-[0]">
                    <div class="w-full lg:max-w-[45%] max-w-[100%] xl:pl-[0] pl-[20px]">
                        <div
                            class="flex flex-col items-start justify-center lg:py-[100px] md:py-[80px] py-[50px] md:pr-[75px] pr-[20px]">
                            <h2
                                class="text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                About SwiftShip
                            </h2>
                            <p
                                class="text-[#FFFFFF] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[14px] mb-[34px]">
                                SwiftShip Logistics is your trusted partner, serving businesses of all sizes and
                                industries.
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
                            Where Innovation Meets Reliable Shipping
                        </h2>
                        <p
                            class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                            At SwiftShip Logistics, we’ve been providing reliable and affordable parcel delivery
                            services to the Springfield area. Our focus on on-time, secure, and flat rate deliveries has
                            earned us the trust of local customers and beyond.
                        </p>
                        <p
                            class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                            What started as a small delivery service in Springfield has grown to support a wide range of
                            industries. SwiftShip Logistics delivers customized parcel solutions, ensuring every
                            shipment arrives on time, every time.
                        </p>
                        <div class="flex mt-[39px]">
                            <NuxtLink
                                class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
                                Contact Us
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="w-full lg:max-w-[calc(41%_-25px)] max-w-[100%]">
                        <img src="/images/innovation.jpg" class="" />
                    </div>
                </div>
            </div>
        </section>

        <WhyChooseUs />

        <MeetTheTeam />

        <div class="py-[50px]"></div>

        <ParcelQuote />

        <FastEasyShipping />

        

        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <!-- Error state -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div>
    </div>
</template>
