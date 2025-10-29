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

const bookNow = async () => {
    if (booking.value) return;
    booking.value = true;
    if (!quote.value.total) {
        alert('Please get a quote first.');
        return;
    }
    const productData = {
        name: `From: ${postalCodesMapping[selectedFrom.value!]} To: ${postalCodesMapping[selectedTo.value!]}`,
        type: 'simple',
        regular_price: quote.value.total.toString(),
        description: `
From: ${postalCodesMapping[selectedFrom.value!]}
To: ${postalCodesMapping[selectedTo.value!]}
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

const postalCodesMapping: Record<number, string> = {
    3000: "Melbourne",
    3002: "Melbourne Docklands",
    3003: "Melbourne",
    3004: "Port Melbourne",
    3005: "South Melbourne",
    3006: "Melbourne",
    3008: "Southbank",
    3011: "Footscray",
    3012: "West Melbourne",
    3013: "West Melbourne",
    3015: "Yarraville",
    3016: "Kingsville",
    3018: "Seddon",
    3020: "Altona",
    3021: "Altona North",
    3023: "Laverton",
    3024: "Hoppers Crossing",
    3025: "Werribee",
    3028: "Truganina",
    3029: "Williams Landing",
    3030: "Sunshine",
    3031: "Flemington",
    3032: "Ascot Vale",
    3036: "Glenroy",
    3037: "Pascoe Vale South",
    3040: "Broadmeadows",
    3041: "Fawkner",
    3042: "Coburg",
    3043: "Coburg North",
    3044: "Gowanbrae",
    3046: "Hadfield",
    3047: "Glenroy South",
    3049: "Pascoe Vale",
    3051: "Brunswick",
    3052: "Brunswick West",
    3055: "Pascoe Vale",
    3056: "Pascoe Vale South",
    3057: "Oak Park",
    3058: "Coburg",
    3060: "Coburg North",
    3061: "Carlton North",
    3065: "Northcote",
    3066: "Thornbury",
    3067: "Preston",
    3068: "Reservoir",
    3070: "Fitzroy North",
    3071: "Princes Hill",
    3072: "Heidelberg West",
    3073: "Ivanhoe",
    3074: "Heidelberg Heights",
    3075: "Bellfield",
    3076: "Eaglemont",
    3078: "Ivanhoe East",
    3079: "Heidelberg",
    3081: "Rosanna",
    3082: "Viewbank",
    3083: "Bundoora",
    3084: "Watsonia",
    3085: "Greensborough",
    3087: "Diamond Creek",
    3093: "Montmorency",
    3094: "Warrandyte",
    3095: "Donvale",
    3096: "Templestowe",
    3101: "Richmond East",
    3102: "Hawthorn",
    3103: "Glen Iris",
    3104: "Ashburton",
    3105: "Burwood",
    3106: "Camberwell",
    3107: "Balwyn",
    3108: "Balwyn North",
    3111: "Box Hill",
    3113: "Mont Albert",
    3114: "Surrey Hills",
    3115: "Blackburn",
    3116: "Nunawading",
    3121: "Richmond",
    3122: "Hawthorn East",
    3123: "Camberwell",
    3124: "Glen Iris",
    3125: "Burwood",
    3126: "Ashwood",
    3127: "Ashburton",
    3128: "Chadstone",
    3130: "Glen Waverley",
    3131: "Mount Waverley",
    3132: "Wheelers Hill",
    3133: "Notting Hill",
    3134: "Clayton",
    3135: "Springvale",
    3136: "Sandown",
    3137: "Dandenong North",
    3138: "Noble Park",
    3141: "South Yarra",
    3142: "Toorak",
    3143: "Armadale",
    3144: "Malvern",
    3145: "Malvern East",
    3147: "Caulfield East",
    3148: "Caulfield",
    3150: "Glen Iris",
    3152: "Mont Albert North",
    3153: "Box Hill North",
    3154: "Box Hill South",
    3155: "Burwood East",
    3156: "Burwood",
    3158: "Camberwell North",
    3160: "Glen Waverley",
    3161: "Mount Waverley",
    3162: "Wheelers Hill",
    3163: "Notting Hill",
    3165: "Clayton",
    3166: "Springvale",
    3168: "Dandenong North",
    3169: "Noble Park",
    3170: "Rowville",
    3171: "Lysterfield",
    3172: "Belgrave",
    3173: "Monbulk",
    3174: "Ferntree Gully",
    3175: "Upwey",
    3177: "Tecoma",
    3178: "Olinda",
    3181: "Kew",
    3182: "Kew East",
    3183: "Balwyn North",
    3184: "Camberwell",
    3185: "Glen Iris",
    3186: "Hawthorn",
    3187: "Hawthorn East",
    3188: "Glen Waverley",
    3189: "Mount Waverley",
    3190: "Wheelers Hill",
    3191: "Notting Hill",
    3192: "Clayton",
    3193: "Springvale",
    3194: "Dandenong North",
    3195: "Noble Park",
    3198: "Lysterfield",
    3199: "Belgrave",
    3200: "Monbulk",
    3201: "Ferntree Gully",
    3750: "Healesville",
    3752: "Yarra Glen",
    3754: "Seville",
    3755: "Wandin East",
    3757: "Silvan",
    3803: "Berwick",
    3804: "Narre Warren",
    3805: "Officer",
    3806: "Pakenham",
    3807: "Beaconsfield",
    3808: "Emerald",
    3809: "Gembrook",
    3810: "Cockatoo",
    3910: "Phillip Island",
    3911: "Cowes",
    3975: "San Remo",
    3976: "Wonthaggi",
    3977: "Venus Bay",
    3978: "Kilcunda",
}

const postalOptions = Object.entries(postalCodesMapping).map(
    ([code, name]) => ({
        value: Number(code),
        label: `${code} - ${name}`
    })
)

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
    showQuote.value = false
    loading.value = true

    if (!selectedFrom.value || !selectedTo.value || !weight.value || !length.value || !width.value || !height.value) {
        toast.error("Please complete all fields and provide parcel dimensions.")
        loading.value = false
        return
    }

    if (weight.value > 22) {
        weightError.value = 'Weight must not exceed 22 kg'
        loading.value = false
        return
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
        
    } catch (error) {
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
                            class="flex items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <span class="block w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            </span>
                            <select v-model="selectedFrom" id="from_country"
                                class="w-full lg:w-[230px] md:w-[200px] sm:w-[170px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]">
                                <option disabled value="null">From: Select Postal Code</option>
                                <option v-for="option in postalOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <!-- To Country -->
                        <div
                            class="flex items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <span class="block w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            </span>
                            <select v-model="selectedTo" id="to_country"
                                class="w-full lg:w-[210px] md:w-[180px] sm:w-[150px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]">
                                <option disabled value="null">To: Select Postal Code</option>
                                <option v-for="option in postalOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <!-- Parcel Weight -->
                        <div class="flex flex-col items-center mr-[16px] lg:mb-0 mb-[12px] lg:mt-0 mt-[12px]">
                            <div class="flex items-center">
                                <span class="block w-full mr-[14px]">
                                    <img src="/images/shopping_bag.svg" class="min-w-[18px]" />
                                </span>
                                <input type="text" v-model.number="weight" placeholder="Parcel Weight?"
                                    class="w-[100px] lg:w-[120px] outline-none bg-transparent text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" />
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
                                        class="outline-none border-b border-gray-300 pb-1" />
                                    <input type="number" v-model.number="width" placeholder="Width (cm)"
                                        class="outline-none border-b border-gray-300 pb-1" />
                                    <input type="number" v-model.number="height" placeholder="Height (cm)"
                                        class="outline-none border-b border-gray-300 pb-1" />
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
                                        2 - 3 Days
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
                                    <NuxtLink 
                                    
                                     :class="[
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
