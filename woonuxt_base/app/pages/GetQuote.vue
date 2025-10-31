<script setup lang="ts">
import { useFetch } from '#app'
import { NuxtLink } from '#components';
import { useToast } from '../composables/useToast'
const toast = useToast()
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const { cart, addToCart, emptyCart } = useCart();

const token = import.meta.env.VITE_AUTH_TOKEN
const BACKEND_API = import.meta.env.VITE_BACKEND_API

const loading = ref(false)
const showQuote = ref(false)
const signatureOnDelivery = ref(false)

const route = useRoute()
const booking = ref(false)

const fromError = ref('')
const toError = ref('')




const bookNow = async () => {
    if (booking.value) return;
    booking.value = true;
    if (!quote.value.total) {
        alert('Please get a quote first.');
        return;
    }
    const productData = {
        name: `From: ${selectedFrom.value} To: ${selectedTo.value}`,
        type: 'simple',
        regular_price: quote.value.total.toString(),
        description: `
From: ${selectedFrom.value}
To: ${selectedTo.value}
Parcel Weight: ${weight.value} kg
Parcel Length: ${length.value} cm
Parcel Width: ${width.value} cm
Parcel Height: ${height.value} cm
Total L*W*H: ${dimension.value} 
Signature: ${signatureOnDelivery.value ? 'Yes' : 'No'}
`,
        status: 'publish'
    }

    try {
        const response = await $fetch('/api/create-product', {
            method: 'POST',
            body: productData
        });

        const productId = (response as any).id;
        if (!productId) throw new Error('Failed to create product');

        await emptyCart();


        await addToCart({ productId, quantity: 1 });
        const cartItems = cart.value?.contents?.nodes || [];

        const productAdded = cartItems.some(
            (item: any) => Number(item.product?.node?.databaseId) === productId
        );

        if (productAdded) {
            const router = useRouter();
            router.push('/checkout');
        } else {
            toast.error('Failed to add product to cart. Please try again.');
        }


    } catch (err) {
        console.error('Error creating product or adding to cart:', err);
        toast.error('Failed to process booking. Please try again.');
    } finally {
        booking.value = false;
    }
}



onMounted(() => {
    const query = route.query
    if (query.from) selectedFrom.value = Number(query.from)
    if (query.to) selectedTo.value = Number(query.to)
    if (query.weight) weight.value = Number(query.weight)
    if (query.length) length.value = Number(query.length)
    if (query.width) width.value = Number(query.width)
    if (query.height) height.value = Number(query.height)
    if (query.length && query.width && query.height) {
        const l = Number(query.length)
        const w = Number(query.width)
        const h = Number(query.height)
        const volume = l * w * h
        dimension.value = `${volume}`
    }

    if (query.total) {
        quote.value.total = Number(query.total)
        showQuote.value = true
    }

    if (query.signature) {
        signatureOnDelivery.value = query.signature === '1' || query.signature === 'true'
    }

})


const selectedFrom = ref<number | null>(null)
const selectedTo = ref<number | null>(null)
const weight = ref<number | null>(null)
const length = ref<number | null>(null)
const width = ref<number | null>(null)
const height = ref<number | null>(null)
const dimension = ref('')


const quote = ref<{ total?: number }>({})


const showModal = ref(false)



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
const submitQuote = async () => {
    weightError.value = ''
    errorMsg.value = ''
    fromError.value = ""
    toError.value = ""
    showQuote.value = false
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

    if (weight.value > 22) {
        weightError.value = 'Weight must not exceed 22 kg'
        hasError = true;
    }

    if (hasError) {
        return;
    }

    loading.value = true

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
        const response = await axios.post(`${BACKEND_API}/api/shipments/rate`,
            body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

        if (response.data.success && response.data.quote) {
            quote.value = response.data.quote
            showQuote.value = true
            const total = quote.value.total ?? 0
        }

    } catch (error: any) {
        if (error.response?.data?.error) {
            toast.error(error.response.data.error)
        } else {
            toast.error("An unexpected error occurred.")
        }
        console.error('Error submitting quote:', error)
    } finally {
        loading.value = false
    }
}

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
                    </div>
                    <div
                        class="w-full flex xl:flex-nowrap flex-wrap items-center border border-[#E4E4F1] rounded-b-[7px] px-[24px] py-[20px] justify-between">
                        <!-- From Country -->
                        <div
                            class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <div class="flex items-center w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />

                                <input type="text" v-model="selectedFrom" placeholder="From: Enter postcode"
                                    maxlength="4" id="from_country" pattern="\d*"
                                    @input="selectedFrom = selectedFrom?.replace(/\D/g, '').slice(0, 4)"
                                    class="w-full lg:w-[230px] md:w-[200px] sm:w-[170px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" " />
                            </div>
                            <p v-if="fromError" class="text-red-500 text-sm mt-1">{{ fromError }}</p>
                            </div>

                            <!-- To Country -->
                            <div
                                class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                                <div class="flex items-center w-full">
                                    <img src="/images/home_pin.svg" class="min-w-[19px]" />
                                    <input type="text" v-model="selectedTo" placeholder="To: Enter postcode"
                                        maxlength="4" id="to_country" pattern="\d*"
                                        @input="selectedTo = selectedTo?.replace(/\D/g, '').slice(0, 4)"
                                        class="w-full lg:w-[210px] md:w-[180px] sm:w-[150px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" " />
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
                                <div
                                    class="flex items-center mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px] relative">
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

                                <!-- Signature Checkbox -->
                                <div class="flex items-center gap-2 mr-[24px] lg:mb-[0] mb-[15px] lg:mt-[0] mt-[15px]">
                                    <input id="signature" type="checkbox" v-model="signatureOnDelivery"
                                        class="w-[16px] h-[16px] accent-[#248BC6] cursor-pointer checked:bg-[#248BC6] focus:ring-0" />
                                    <label for="signature" class="text-[#141416] text-[14px] font-[PingLCG] font-[500]">
                                        Add Signature
                                    </label>
                                </div>


                                <!-- Button -->
                                <button @click="submitQuote"
                                    class="bg-[#248BC6] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer lg:mt-[0] mt-[20px]">
                                    Get a Quote
                                </button>
                            </div>
                        </div>
                        <div class="w-full max-w-[948px] mx-auto mt-[40px] min-h-[100px]">

                            <div v-if="loading" class="text-center py-10">
                                <span class="text-[#248BC6] font-[PingLCG] font-[500]">Loading quote...</span>
                            </div>
                            <div v-else-if="showQuote" class="w-full max-w-[948px] mx-auto mt-[40px] mb-[100px]">
                                <div class="w-full border border-[#E4E4F1]">
                                    <div
                                        class="w-full border-b border-[#E4E4F1] bg-[#FAFAFA] flex items-center justify-center gap-[5px] py-[10px]">
                                        <h3
                                            class="text-[#000000] font-[PingLCG] font-[700] md:text-[22px] text-[20px] leading-[normal] text-center">
                                            Next Day Delivery
                                        </h3>
                                        <img src="/images/stars.svg" class="" />
                                    </div>
                                    <div class="flex md:flex-nowrap flex-wrap md:flex-row flex-col md:items-center">
                                        <div
                                            class="md:py-[50px] py-[25px] md:px-[40px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
                                            <p
                                                class="block text-[#141416] font-[PingLCG] font-[400] md:text-[18px] text-[16px] leading-[normal]">
                                                Delivery Speed
                                            </p>
                                            <span
                                                class="block text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] mt-[18px]">
                                                Within 24 Hours
                                            </span>
                                        </div>
                                        <div
                                            class="md:py-[50px] py-[25px] md:px-[40px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
                                            <p
                                                class="block text-[#141416] font-[PingLCG] font-[400] md:text-[18px] text-[16px] leading-[normal]">
                                                Price Per item
                                            </p>
                                            <span
                                                class="block text-[#141416] font-[PingLCG] font-[700] md:text-[20px] text-[18px] leading-[normal] mt-[18px]">
                                                ${{ quote.total ?? 0 }}
                                                <span class="font-[400] text-[15px]">(Add $1/kg for over 40kg)</span>
                                            </span>
                                        </div>
                                        <div
                                            class="md:py-[50px] py-[25px] md:px-[35px] px-[30px] md:border-r md:border-b-0 border-b border-[#E4E4F1] ">
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
                                            <NuxtLink :class="[
                                                'bg-[#141416] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#141416] hover:bg-white hover:border-[#141416] hover:text-[#141416] lg:mt-[0] mt-[20px] cursor-pointer',
                                                booking ? 'cursor-not-allowed' : ''
                                            ]" :disabled="booking">
                                                {{ booking ? 'Booking...' : 'Book Now' }}
                                            </NuxtLink>
                                            <!-- @click.prevent="bookNow" -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </section>

    </div>
</template>
