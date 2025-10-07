<script setup>
import { NuxtLink } from '#components';

</script>

<template>
    <section class="bg-[#FAFAFA] ">
      <div class="container">
        <div class="flex flex-wrap justify-between md:py-[100px] py-[50px] lg:gap-[200px] gap-[50px] items-start">
          <div class="flex flex-col justify-center w-full lg:max-w-[calc(50%_-100px)] md:max-w-[calc(50%_-25px)] max-w-[100%]">
            <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[66px] md:leading-[50px] leading-[46px]">
              Fast & Easy Shipping in 4 Simple Steps
            </h2>
            <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] leading-[29px] mt-[20px]">
              Sending a parcel with SwiftShip is quick, transparent, and hassle-free, with a straightforward process
              that ensures your shipment is booked, tracked, and delivered efficiently.
            </p>
            <div class="flex mt-[40px]">
              <NuxtLink
                class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal px-[36px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
                Get a Quote
              </NuxtLink>
            </div>
          </div>
          <div class="w-full lg:max-w-[calc(50%_-100px)] md:max-w-[calc(50%_-25px)] max-w-[100%]">
            <div>
              <ul class="fes_ul flex flex-col gap-[55px]">
                <li class="pl-[54px]">
                  <span class="block text-[#161D25] font-[PingLCG] font-[700] md:text-[20px] text-[18px]  leading-[normal]">Get a
                    Quote</span>
                  <p class="text-[#000000] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">Enter parcel
                    details to see shipping cost instantly.</p>
                </li>
                <li class="pl-[54px]">
                  <span class="block text-[#161D25] font-[PingLCG] font-[700] md:text-[20px] text-[18px]  leading-[normal]">Book Your
                    Shipment</span>
                  <p class="text-[#000000] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">Enter sender
                    and receiver to schedule pickup online.</p>
                </li>
                <li class="pl-[54px]">
                  <span class="block text-[#161D25] font-[PingLCG] font-[700] md:text-[20px] text-[18px]  leading-[normal]">Track in
                    Real-Time</span>
                  <p class="text-[#000000] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">Track your
                    parcel at every step with live updates.</p>
                </li>
                <li class="pl-[54px]">
                  <span class="block text-[#161D25] font-[PingLCG] font-[700] md:text-[20px] text-[18px]  leading-[normal]">Fast
                    Delivery</span>
                  <p class="text-[#000000] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">Your shipment
                    is delivered quickly and on schedule.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>