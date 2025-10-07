<script setup>
import { NuxtLink } from '#components';

</script>

<template>
    <section>
      <div class="container">
        <div class="flex flex-wrap justify-between lg:mt-[100px] mt-[50px] lg:gap-[100px] gap-[50px]">
          <div class="w-full lg:max-w-[calc(50%_-50px)] max-w-[100%]">
            <img src="/images/sec2img.jpg" class="" />
          </div>
          <div class="flex flex-col justify-center w-full lg:max-w-[calc(50%_-50px)] max-w-[100%]">
            <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
              Meet the Team Behind SwiftShip Logistics
            </h2>
            <p class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[15px] mb-[35px] pr-[20px]">
              At SwiftShip Logistics, we make parcel delivery simple, fast, and dependable. With next-day service and an
              easy online portal, sending and tracking packages is effortless.
            </p>
            <div class="flex flex-col gap-[12px]">
              <div class="w-full bg-[#FFFFFF] border border-[#E4DFDF] rounded-[10px] px-[20px] py-[25px] w-full">
                <div class="flex gap-[24px] items-start">
                  <img src="/images/mission.svg" />
                  <div>
                    <span class="block text-[#141416] font-[PingLCG] font-[700] text-[20px] leading-[normal]">
                      Mission
                    </span>
                    <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">
                      Making parcel delivery simple, fast, and reliable, with seamless shipping for individuals and
                      businesses.
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full bg-[#FFFFFF] border border-[#E4DFDF] rounded-[10px] px-[20px] py-[25px] w-full">
                <div class="flex gap-[24px] items-start">
                  <img src="/images/secure.svg" />
                  <div>
                    <span class="block text-[#141416] font-[PingLCG] font-[700] text-[20px] leading-[normal]">
                      Value
                    </span>
                    <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">
                      We value speed, reliability, customer focus, innovation, sustainability, and integrity in every
                      shipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex mt-[39px]">
              <NuxtLink
                class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
                Get a Quote
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>