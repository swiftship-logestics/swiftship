<script setup>
import { ref } from "vue"

const openIndex = ref(null)

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}

// Example FAQ data
const faqs = [
    {
        question: "How do I track my parcel?",
        answer:
            "You can easily track your parcel in real-time using our advanced live tracking system by entering your unique tracking number."
    },
    {
        question: "How do I schedule a pickup?",
        answer:
            "Delivery usually takes 2-3 business days domestically and 5-7 days internationally."
    },
    {
        question: "How much does shipping cost?",
        answer:
            "Yes, you can schedule a pickup directly from our website or mobile app."
    },
    {
        question: "What items are not allowed for shipping?",
        answer:
            "Yes, you can schedule a pickup directly from our website or mobile app."
    },
    {
        question: "What should I do if my parcel is delayed?",
        answer:
            "Yes, you can schedule a pickup directly from our website or mobile app."
    }
]
</script>

<template>
    <section>
        <div class="container">
            <div class="lg:py-[100px] py-[50px]">
                <div class="text-center">
                    <span
                        class="text-[#248BC6] font-[Avenir] font-[700] text-[18px] leading-[34px] uppercase">frequently
                        asked
                        questions</span>
                    <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[29px] lg:leading-[66px] md:leading-[56px] leading-[36px] md:mt-[0] mt-[15px]">
                        Quick Answer to your Questions
                    </h2>
                </div>
                <div class="accordion lg:mt-[40px] mt-[30px]">
                    <div v-for="(item, index) in faqs" :key="index"
                        class="accordion-box md:py-[35px] py-[30px] border-b border-[#1414164d]">
                        <!-- Accordion Header -->
                        <div class="accordion-title flex items-center justify-between cursor-pointer gap-[15px]"
                            @click="toggle(index)">
                            <span class="block text-[#141416] font-[PingLCG] font-[800] md:text-[20px] text-[18px] leading-[normal]">
                                {{ item.question }}
                            </span>

                            <span class="accordion-icon">
                                <!-- minus (opened) -->
                                <span v-if="openIndex === index" class="opened">
                                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.246094 3.42188V0.578125H15.7542V3.42188H0.246094Z" fill="#141416" />
                                    </svg>
                                </span>

                                <!-- plus (closed) -->
                                <span v-else class="closed">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.57828 10.422H-0.00390625V7.57828H7.57828V-0.00390625H10.422V7.57828H18.0042V10.422H10.422V18.0042H7.57828V10.422Z"
                                            fill="#141416" fill-opacity="0.48" />
                                    </svg>
                                </span>
                            </span>
                        </div>

                        <!-- Accordion Content -->
                        <div v-show="openIndex === index" class="accordion-content mt-[20px]">
                            <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] leading-[29px]">
                                {{ item.answer }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>