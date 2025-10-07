<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

</script>

<template>
    <div class="main-content bg-white">

        <section>
            <div class="container">
                <div class="md:mt-[80px] mt-[50px]">
                    <div class="bg-[#EEF9FF] border-b-[3px] border-[#248BC6] py-[19px]">
                        <span
                            class="block text-[#141416] font-[PingLCG] font-[500] md:text-[16px] text-[16px] uppercase leading-[normal] text-center mb-[10px]">Your
                            Quick Quote</span>
                        <h2
                            class="text-[#141416] font-[PingLCG] font-[800] md:text-[40px] text-[20px] leading-[normal] text-center">
                            Australia to Australia
                        </h2>
                    </div>
                    <div
                        class="w-full flex xl:flex-nowrap flex-wrap items-center border border-[#E4E4F1] rounded-b-[7px] px-[24px] py-[20px] justify-between">
                        <!-- From Country -->
                        <div
                            class="flex items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <span class="block w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            </span>
                            <select id="from_country"
                                class="w-full lg:min-w-[255px] min-w-[100%] max-w-[255px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]">
                                <option>From: Australia</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>India</option>
                            </select>
                        </div>

                        <!-- To Country -->
                        <div
                            class="flex items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <span class="block w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            </span>
                            <select id="to_country"
                                class="w-full lg:min-w-[255px] min-w-[100%] max-w-[255px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]">
                                <option>To: Canada</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>India</option>
                            </select>
                        </div>

                        <!-- Parcel Weight -->
                        <div class="flex items-center mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px]">
                            <span class="block w-full mr-[14px]">
                                <img src="/images/shopping_bag.svg" class="min-w-[18px]" />
                            </span>
                            <input type="text" placeholder="Parcel Weight?"
                                class="w-auto max-w-[174px] outline-none bg-transparent text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" />
                        </div>

                        <!-- Dimensions -->
                        <div class="flex items-center mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px]">
                            <span class="block w-full mr-[14px]">
                                <img src="/images/square_foot.svg" class="min-w-[22px]" />
                            </span>
                            <input type="text" placeholder="L*W*H (cm)"
                                class="w-auto max-w-[85px] outline-none bg-transparent text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" />
                        </div>

                        <!-- Button -->
                        <NuxtLink
                            class="bg-[#248BC6] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer lg:mt-[0] mt-[20px]">
                            Get a Quote
                        </NuxtLink>
                    </div>
                </div>

                <div class="w-full max-w-[948px] mx-auto mt-[40px] mb-[100px]">
                    <div class="w-full border border-[#E4E4F1]">
                        <div
                            class="w-full border-b border-[#E4E4F1] bg-[#FAFAFA] flex items-center justify-center gap-[5px] py-[10px]">
                            <h3
                                class="text-[#000000] font-[PingLCG] font-[700] md:text-[22px] text-[20px] leading-[normal] text-center">
                                Economy
                            </h3>
                            <img src="/images/stars.svg" class="" />
                        </div>
                        <div class="flex md:flex-nowrap flex-wrap md:flex-row flex-col md:items-center">
                            <div class="md:py-[50px] py-[25px] md:px-[40px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
                                <p
                                    class="block text-[#141416] font-[PingLCG] font-[400] md:text-[18px] text-[16px] leading-[normal]">
                                    Delivery Speed
                                </p>
                                <span
                                    class="block text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] mt-[18px]">
                                    2 - 3 Days
                                </span>
                            </div>
                            <div class="md:py-[50px] py-[25px] md:px-[40px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
                                <p
                                    class="block text-[#141416] font-[PingLCG] font-[400] md:text-[18px] text-[16px] leading-[normal]">
                                    Price Per item
                                </p>
                                <span
                                    class="block text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] mt-[18px]">
                                    $40
                                    <span class="font-[400] text-[15px]">(Add $1/kg for over 40kg)</span>
                                </span>
                            </div>
                            <div class="md:py-[50px] py-[25px] md:px-[35px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
                                <p
                                    class="block text-[#141416] font-[PingLCG] font-[400] md:text-[18px] text-[16px] leading-[normal]">
                                    Earliest Collection
                                </p>
                                <span
                                    class="block text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] mt-[18px]">
                                    Tomorrow
                                </span>
                            </div>
                            <div class="md:py-[50px] py-[25px] px-[30px]">
                                <NuxtLink
                                    class="bg-[#141416] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#141416] hover:bg-white hover:border-[#141416] hover:text-[#141416] cursor-pointer lg:mt-[0] mt-[20px]">
                                    Book Now
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <!-- Error state -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div>
    </div>
</template>
