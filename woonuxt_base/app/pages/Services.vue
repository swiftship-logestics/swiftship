<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

const services = [
    {
        icon: "/images/line-d-icon3.svg",
        title: "Next-Day Delivery",
        highlight: "Guaranteed Arrival",
        description: "We offer guaranteed next day delivery for most locations, ensuring your packages arrive when you need them."
    },
    {
        icon: "/images/rrtrack.svg",
        title: "Real-Time Tracking",
        highlight: "Track Anytime",
        description: "Stay informed with our real time tracking system, allowing you to monitor your parcel's journey from pickup to delivery."
    },
    {
        icon: "/images/line-d-icon2.svg",
        title: "Flexible Pickup Options",
        highlight: "Convenient Scheduling",
        description: "Schedule pickups at your convenience, whether at home or your business location."
    }
]

const guidlines = [
    {
        title: "Use Study Materials ",
        description: "Choose study boxes or envelopes that match the weight of your items."
    },
    {
        title: "Seal Packages Securely",
        description: "Properly seal packages with strong tape to ensure they remain closed during transit."
    },
    {
        title: "Label Clearly",
        description: "Label packages clearly with the recipient’s address, contact details, and any handling instructions."
    },
    {
        title: "Protect Fragile Items",
        description: "Protect fragile items with cushioning materials like bubble wrap or packing peanuts to prevent damage."
    },
    {
        title: "Pack According to Weight",
        description: "Select packaging that fits your items properly to minimize movement and reduce the risk of damage during transit."
    },
    {
        title: "Avoid Dangerous Items",
        description: "Avoid including hazardous materials or items that may pose risks during next-day courier transportation."
    }
]

</script>

<template>
    <div class="main-content bg-white">

        <section class="bg-[#248BC6]">
            <div class="container-special">
                <div class="flex flex-wrap justify-between xl:pl-[calc((100%_-_1240px)_/_2)] pl-[0]">
                    <div class="w-full lg:max-w-[45%] max-w-[100%] xl:pl-[0] pl-[20px]">
                        <div
                            class="flex flex-col items-start justify-center lg:py-[100px] md:py-[80px] py-[50px] md:pr-[75px] pr-[20px]">
                            <h2
                                class="text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                Domestic Delivery
                            </h2>
                            <p
                                class="text-[#FFFFFF] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[14px] mb-[34px]">
                                Our domestic delivery service is fast and reliable, providing flexible parcel sizes,
                                weight limits, and multiple shipping options for hassle free deliveries nationwide.
                            </p>
                            <NuxtLink
                                class="px-4 py-2 bg-[#fff] text-[#248BC6] rounded-[6px] font-[PingLCG] font-[700] text-[16px] leading-normal md:px-[36px] px-[26px] md:py-[16px] py-[15px] md:h-[57px] h-auto border border-[#fff] hover:bg-transparent hover:border-[#fff] hover:text-[#fff] cursor-pointer">
                                Get a Quote
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="w-full lg:max-w-[55%] max-w-[100%]">
                        <img src="/images/service-hero.jpg" class="w-full h-full object-cover" />
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
                            Size and weight
                        </h2>
                        <ul class="list-disc pl-[20px] mt-[10px]">
                            <li
                                class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                Each parcel can weigh up to 40kg. Add $1/kg over 40kg.
                            </li>
                            <li
                                class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                Parcels can be up to 1.2m in length, and the combined length and girth should not exceed
                                2.5m.
                            </li>
                            <li
                                class="text-[#000] font-[PingLCG] font-[400] md:text-[17px] text-[16px] md:leading-[29px] leading-[26px] mt-[15px]">
                                Larger items can be sent using our 3 day large item delivery service.
                            </li>
                        </ul>
                    </div>
                    <div class="w-full lg:max-w-[calc(45%_-50px)] max-w-[100%] text-center">
                        <img src="/images/drwbox.png" class="mx-auto" />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="flex flex-wrap justify-between lg:mt-[100px] mt-[50px] lg:gap-[50px] gap-[50px]">
                    <div class="w-full lg:max-w-[calc(45%_-25px)] max-w-[100%]">
                        <img src="/images/rel_domest.jpg" class="" />
                    </div>
                    <div class="flex flex-col justify-center w-full lg:max-w-[calc(55%_-25px)] max-w-[100%]">
                        <h2
                            class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px] mb-[10px]">
                            Reliable Domestic Shipping at your Service
                        </h2>
                        <p
                            class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                            Domestic delivery ensures your parcels reach any location within the country quickly and
                            reliably. Whether you’re sending documents, gifts, or goods, our service makes shipping
                            simple and stress-free.
                        </p>
                        <p
                            class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                            We offer flexible options to suit your needs: send parcels up to 10kg, choose from
                            convenient satchel sizes of 1kg, 3kg, or 5kg, and select from Next-Day, Priority, or
                            Standard services for full control.
                        </p>
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

        <section class="bg-[#FAFAFA] lg:mt-[100px] mt-[50px]">
            <div class="container">
                <div class="lg:py-[100px] py-[50px] w-full">
                    <h2
                        class="text-[#141416] text-center font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
                        Key Features
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

        <ParcelQuote />

        <section class="bg-[#FAFAFA] md:py-[80px] py-[50px]">
            <div class="container">
                <div>
                    <div class="text-center">
                        <h2
                            class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[29px] lg:leading-[66px] md:leading-[56px] leading-[36px] md:mt-[0] mt-[15px]">
                            Packing Guidelines
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
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <FAQSection />

        <section class="bg-[#FAFAFA] md:py-[100px] py-[50px]">
            <div class="container">
                <div class="flex flex-wrap justify-between lg:gap-[60px] gap-[40px]">
                    <div class="w-full lg:max-w-[calc(50%_-30px)] max-w-[100%]">
                        <img src="/images/map-img.jpg" class="rounded-[12px]" />
                    </div>
                    <div class="flex flex-col justify-center w-full lg:max-w-[calc(50%_-30px)] max-w-[100%]">
                        <h2
                            class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px] mb-[10px]">
                            We provide services in this area
                        </h2>
                        <p
                            class="text-[#141416] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[5px]">
                            We have been serving the Springfield area, offering reliable parcel delivery services at a
                            great guaranteed flat rate. It all began with a single delivery service in Springfield. We
                            offer services across Springfield's suburbs and more:
                        </p>
                        <ul class="w-full flex flex-col md:max-h-[180px] max-h-[none] flex-wrap mt-[30px] gap-y-[20px]">
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Ipswich</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Brisbane</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Redbank Plains</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Goodna</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Springfield Lakes</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Camira</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Forest Lake</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Sundale</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Bellbird Park</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Ripley</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Moores Pocket</NuxtLink></li>
                            <li class="text-[#141416] font-[Avenir] font-[400] md:text-[17px] text-[16px] leading-[normal] w-full md:max-w-[33.33%] max-w-[50%]"><NuxtLink class="cursor-pointer underline">Deebing Heights</NuxtLink></li>
                        </ul>
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
