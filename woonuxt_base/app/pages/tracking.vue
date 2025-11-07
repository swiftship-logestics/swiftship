// designer-Services2.vue
<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';
import { useToast } from '../composables/useToast'
const toast = useToast()
// const { data, pending, error } = await useFetch('/api/page')
const trackingID = ref('')
const trackingURL = ref('');
const iframeLoading = ref(true);

const openTracking = () => {
    if (!trackingID.value) return toast.error('Please enter a tracking ID')
    trackingURL.value = `https://app.tookanapp.com/tracking/index.html?jobID=${trackingID.value}`;
    // const url = `https://app.tookanapp.com/tracking/index.html?jobID=${trackingID.value}`
    // window.open(url, '_blank')
    const iframeSection = document.querySelector('.tracking-iframe-container');
    if (iframeSection) {
        iframeSection.scrollIntoView({ behavior: 'smooth' });
    }

    iframeLoading.value = true;
}

const iframeLoaded = () => {
    iframeLoading.value = false;

    const iframeSection = document.querySelector('.tracking-iframe-container');
    if (iframeSection) {
        iframeSection.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <div class="main-content bg-white">

        <section class="bg-[#248BC6]">
            <div class="container-special">
                <div class="flex items-center flex-wrap justify-between xl:pl-[calc((100%_-_1240px)_/_2)] pl-[0]">
                    <div class="w-full lg:max-w-[45%] max-w-[100%] xl:pl-[0] pl-[20px]">
                        <div
                            class="flex flex-col items-start justify-center lg:py-[50px] md:py-[50px] py-[50px] md:pr-[75px] pr-[20px]">
                            <h2
                                class="text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[55px] md:leading-[46px] leading-[40px]">
                                Track & Trace Shipment
                            </h2>
                            <p
                                class="text-[#FFFFFF] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[34px] leading-[29px] mt-[14px] mb-[30px]">
                                Track your Shipment now
                            </p>
                            <form class="w-full" @submit.prevent="openTracking">
                                <label class="relative block w-full">
                                    <input type="text" v-model="trackingID" name="trackingID"
                                        placeholder="Enter Tracking ID here...."
                                        class="w-full border border-[#FFFFFF] br-[#FFFFFF] md:px-[25px] sm:px-[20px] px-[15px] md:py-[14px] py-[10px] text-[#151515] text-[16px] font-[400] font-[Avenir] leading-[28px] placeholder:text-[#818181] rounded-[6px] w-full" />
                                    <button type="submit"
                                        class="absolute md:right-[9px] right-[5px] top-[50%] translate-y-[-50%] bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal md:px-[36px] sm:px-[22px] px-[18px] md:py-[10px] py-[8px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer text-center block w-full max-w-[fit-content]">
                                        Get a Quote
                                    </button>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="w-full lg:max-w-[55%] max-w-[100%]">
                        <img src="/images/phn-img.jpg" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="md:py-[100px] py-[50px] text-center w-full max-w-[890px] mx-auto">
                    <h2
                        class="text-[#000000] font-[PingLCG] font-[800] lg:text-[44px] md:text-[35px] text-[28px] lg:leading-[29px] md:leading-[29px] leading-[29px]">
                        Tracking Status
                    </h2>
                    <p
                        class="text-[#000000] font-[Avenir] font-[400] md:text-[20px] text-[18px] md:leading-[32px] leading-[29px] mt-[30px]">
                        Swift Ship never asks customers to pay online or share OTP/ UPI Pin. Any such request over phone
                        may be treated as fraud call. Consignment status is available for 75 Days Only.
                    </p>
                </div>
            </div>
        </section>

        <section>

            <div v-if="trackingURL" class="tracking-iframe-container flex justify-center mb-8">

                <iframe :src="trackingURL" width="70%" height="500px" frameborder="0" title="Tracking Info"
                    class="border border-[#248BC6] rounded-lg" @load="iframeLoaded"></iframe>
            </div>
        </section>

        <section class="bg-[#248BC6] lg:py-[90px] py-[50px] w-full">
            <div class="container">
                <div class="flex flex-col items-center justify-center mx-auto max-w-[1090px]">
                    <p
                        class="text-[#FFFFFF] font-[Avenir] font-[700] md:text-[18px] text-[16px] leading-[30px] mt-[18px] uppercase">
                        Need further Support?
                    </p>
                    <h2
                        class="mt-[10px] text-center text-[#FFFFFF] font-[PingLCG] font-[800] lg:text-[48px] md:text-[40px] text-[30px] lg:leading-[66px] md:leading-[56px] leading-[46px]">
                        Raise a <span class="text-[#141416]">query below</span>, and our representative will get in
                        touch with you shortly regarding your complaint.
                    </h2>
                    <NuxtLink
                        class="px-4 py-2 bg-transparent text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] md:px-[30px] px-[26px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#ffffff30] hover:bg-white hover:border-[#fff] hover:text-[#141416] cursor-pointer mt-[25px]">
                        Contact Us
                    </NuxtLink>
                </div>
            </div>
        </section>

        <FAQSection />



        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <!-- Error state -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div>
    </div>
</template>
