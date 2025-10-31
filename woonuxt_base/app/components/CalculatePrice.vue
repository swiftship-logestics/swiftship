<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { NuxtLink } from '#components';
import { useToast } from '../composables/useToast'
const toast = useToast()
const router = useRouter()
const token = import.meta.env.VITE_AUTH_TOKEN
const BACKEND_API = import.meta.env.VITE_BACKEND_API
const fromError = ref('')
const toError = ref('')


const selectedFrom = ref('')
const selectedTo = ref('')
const signatureOnDelivery = ref(false)


const weight = ref<number | null>(null)

const showModal = ref(false)

const length = ref<number | null>(null)
const width = ref<number | null>(null)
const height = ref<number | null>(null)

const dimension = ref('')

const errorMsg = ref('')

const setDimension = () => {
    if (length.value && width.value && height.value) {
        const volume = length.value * width.value * height.value
        dimension.value = volume.toString()
        showModal.value = false
        errorMsg.value = ''
    } else {
        errorMsg.value = 'All fields are required'
    }
}

const weightError = ref('')
const isSubmitting = ref(false)

const submitQuote = async () => {

    weightError.value = ''
    errorMsg.value = ''
    fromError.value = ""
    toError.value = ""
    let hasError = false;
    if (!selectedFrom.value || !selectedTo.value || !weight.value || !length.value || !width.value || !height.value) {
        toast.error("Please complete all fields and provide parcel dimensions.")
       hasError = true;
    }
 if (selectedFrom.value.length !== 4) {
        fromError.value = 'From postcode must be 4 digits.'
        hasError = true;      
    }
    if (selectedTo.value.length !== 4) {
        toError.value = 'To postcode must be 4 digits.'
        hasError = true;
    }


    // Validate weight (not exceeding 22kg)
    if (weight.value === null || isNaN(Number(weight.value))) {
        toast.error("Weight must be a number")
       hasError = true;
    } else if (weight.value > 22) {
        weightError.value = 'Weight must not exceed 22 kg'
        hasError = true;
    }

      if (hasError) {
        return;
    }

    const body = {
        // frompostcode: selectedFrom.value,
        postcode: selectedTo.value,
        weight: weight.value,
        length: length.value,
        width: width.value,
        height: height.value,
        signatureOnDelivery: signatureOnDelivery.value
    }

    try {
        isSubmitting.value = true
        const response = await axios.post(`${BACKEND_API}/api/shipments/rate`,
            body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        if (response.data.success && response.data.quote) {
            // Navigate to getquote page with query params
            router.push({
                path: '/getquote',
                query: {
                    from: selectedFrom.value,
                    to: selectedTo.value,
                    weight: weight.value,
                    length: length.value,
                    width: width.value,
                    height: height.value,
                    total: response.data.quote.total,
                    signature: signatureOnDelivery.value ? '1' : '0'
                }
            })
        }
    } catch (error: any) {
        if (error.response?.data?.error) {
            toast.error(error.response.data.error)
        } else {
            toast.error("An unexpected error occurred.")
        }
        console.error('Error submitting quote:', error)
    } finally {
        isSubmitting.value = false
    }
}

</script>

<template>
    <section>
        <div class="container">
            <div class="md:mt-[80px] mt-[50px]">
                <div class="bg-[#EEF9FF] border-b-[3px] border-[#248BC6] py-[19px]">
                    <h2
                        class="text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] text-center">
                        Calculate Price of Your Parcel
                    </h2>
                </div>
                <div
                    class="w-full flex xl:flex-nowrap flex-wrap items-center border border-[#E4E4F1] rounded-b-[7px] px-[24px] py-[20px] justify-between">
                    <!-- From Country -->
                    <div
                        class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                        <div class="flex items-center w-full">

                            <img src="/images/home_pin.svg" class="min-w-[19px]" />

                            <input type="text" v-model="selectedFrom" placeholder="From: Enter postcode" maxlength="4"
                                pattern="\d*" @input="selectedFrom = selectedFrom.replace(/\D/g, '').slice(0, 4)"
                                class="w-full lg:w-[230px] md:w-[200px] sm:w-[170px] outline-none bg-transparent m-0 border-gray-300 py-[18px] pl-[14px] pr-[14px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                        </div>
                        <p v-if="fromError" class="text-red-500 text-sm mt-1">{{ fromError }}</p>
                    </div>

                    <!-- To Country -->
                    <div
                        class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                        <div class="flex items-center w-full">
                            <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            <input type="text" v-model="selectedTo" placeholder="To: Enter postcode" maxlength="4"
                                pattern="\d*" @input="selectedTo = selectedTo.replace(/\D/g, '').slice(0, 4)"
                                class="w-full lg:w-[210px] md:w-[180px] sm:w-[150px] outline-none bg-transparent m-0 border-gray-300 py-[18px] pl-[14px] pr-[14px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                        </div>
                        <p v-if="toError" class="text-red-500 text-sm mt-1">{{ toError }}</p>
                    </div>

                    <!-- Parcel Weight -->
                    <div class="flex flex-col items-center mr-[16px] lg:mb-0 mb-[12px] lg:mt-0 mt-[12px]">
                        <div class="flex items-center">
                            <span class="block w-full mr-[14px]">
                                <img src="/images/shopping_bag.svg" class="min-w-[18px]" />
                            </span>
                            <input type="number" v-model.number="weight" placeholder="Parcel Weight?"
                                class="w-[100px] lg:w-[120px] outline-none bg-transparent text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                        </div>
                        <p v-if="weightError" class="text-red-500 text-sm mt-1">{{ weightError }}</p>
                    </div>

                    <!-- Dimensions -->
                    <div class="flex items-center mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px] relative">
                        <span class="block w-full mr-[14px]">
                            <img src="/images/square_foot.svg" class="min-w-[22px]" />
                        </span>
                        <input readonly v-model="dimension" @click="showModal = true" type="text"
                            placeholder="L*W*H (cm)"
                            class="w-auto max-w-[85px] outline-none bg-transparent text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal] cursor-pointer" />

                        <!-- Popup Modal -->
                        <div v-if="showModal"
                            class="absolute z-50 top-full mt-2 left-0 bg-white border border-gray-300 rounded p-4 shadow-lg w-[200px]">
                            <div class="flex flex-col gap-2">
                                <input type="number" v-model.number="length" placeholder="Length (cm)"
                                    class="outline-none border-b border-gray-300 pb-1  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                                <input type="number" v-model.number="width" placeholder="Width (cm)"
                                    class="outline-none border-b border-gray-300 pb-1  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                                <input type="number" v-model.number="height" placeholder="Height (cm)"
                                    class="outline-none border-b border-gray-300 pb-1  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield" />
                                <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
                                <div class="flex justify-end gap-2 mt-2">
                                    <button @click="showModal = false"
                                        class="px-2 py-1 text-sm bg-gray-200 rounded">Cancel</button>
                                    <button @click="setDimension"
                                        class="px-2 py-1 text-sm bg-[#248BC6] text-white rounded">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="flex items-center gap-2 mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px]">
                        <input id="signature" type="checkbox" v-model="signatureOnDelivery"
                            class="w-[16px] h-[16px] accent-[#248BC6] cursor-pointer checked:bg-[#248BC6] focus:ring-0" />
                        <label for="signature" class="text-[#141416] text-[14px] font-[PingLCG] font-[500]">
                            Add Signature
                        </label>
                    </div>



                    <!-- Button -->
                    <button @click="submitQuote" to="/getquote" :disabled="isSubmitting"
                        class="bg-[#248BC6] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer lg:mt-[0] mt-[20px]">
                        {{ isSubmitting ? 'Get a Quote...' : 'Get a Quote' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
