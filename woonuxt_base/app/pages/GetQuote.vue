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


const postcodeMap: Record<number, string> = {
    3000: "Melbourne",
    3002: "East Melbourne",
    3003: "West Melbourne",
    3004: "Melbourne (St Kilda Road)",
    3005: "World Trade Centre",
    3006: "Southbank",
    3008: "Docklands",
    3011: "Footscray",
    3012: "West Footscray",
    3013: "Yarraville",
    3015: "Newport",
    3031: "Kensington",
    3032: "Flemington",
    3040: "Essendon",
    3041: "Strathmore",
    3044: "Pascoe Vale South",
    3046: "Glenroy",
    3051: "North Melbourne",
    3052: "Parkville",
    3055: "Brunswick West",
    3056: "Brunswick",
    3057: "Brunswick East",
    3058: "Coburg",
    3060: "Fawkner",
    3061: "Campbellfield",
    3065: "Fitzroy",
    3066: "Collingwood",
    3067: "Abbotsford",
    3068: "Clifton Hill",
    3070: "Northcote",
    3071: "Thornbury",
    3072: "Preston",
    3073: "Reservoir",
    3078: "Fairfield",
    3079: "Alphington",
    3081: "Heidelberg West",
    3083: "Bundoora",
    3084: "Ivanhoe",
    3085: "Macleod",
    3087: "Watsonia",
    3093: "Lower Plenty",
    3094: "Montmorency",
    3095: "Eltham",
    3096: "Research",
    3101: "Kew",
    3102: "Kew East",
    3103: "Balwyn",
    3104: "Balwyn North",
    3105: "Bulleen",
    3106: "Templestowe",
    3107: "Templestowe Lower",
    3108: "Doncaster",
    3111: "Donvale",
    3113: "Warrandyte",
    3114: "Warrandyte South",
    3115: "Wonga Park",
    3116: "Chirnside Park",
    3121: "Richmond",
    3122: "Hawthorn",
    3123: "Hawthorn East",
    3124: "Camberwell",
    3125: "Burwood",
    3126: "Canterbury",
    3127: "Surrey Hills",
    3128: "Box Hill",
    3130: "Blackburn",
    3131: "Forest Hill",
    3132: "Mitcham",
    3141: "South Yarra",
    3142: "Toorak",
    3143: "Armadale",
    3144: "Malvern",
    3145: "Caulfield East",
    3147: "Ashburton",
    3148: "Chadstone",
    3150: "Glen Waverley",
    3161: "Caulfield",
    3162: "Caulfield South",
    3163: "Carnegie",
    3165: "Bentleigh East",
    3166: "Oakleigh",
    3168: "Clayton",
    3169: "Clarinda",
    3170: "Mulgrave",
    3172: "Dandenong North",
    3173: "Dandenong South",
    3181: "Prahran",
    3182: "St Kilda",
    3183: "St Kilda East",
    3184: "Elwood",
    3185: "Brighton",
    3193: "Beaumaris",
    3194: "Mentone",
    3195: "Mordialloc",
    3202: "Heatherton",
    3204: "Bentleigh",
    3205: "South Melbourne",
    3206: "Albert Park",
    3207: "Port Melbourne",
    3151: "Bayswater",
    3109: "Ringwood",
    3140: "Hawthorn",
    3146: "Glen Iris",
    3167: "Oakleigh South",
    3010: "Melbourne Airport",
    3019: "Braybrook",
    3039: "Keilor East",
    3053: "Carlton South",
    3054: "Carlton",
    3179: "Lyndhurst",
    3086: "Bundoora",
    3022: "St Albans",
    3027: "Deer Park",
    3033: "Kealba",
    3034: "Avondale Heights",
    3016: "Maidstone",
    3018: "Braybrook",
    3020: "Kingsville",
    3021: "St Albans",
    3023: "St Albans",
    3024: "Sunshine",
    3025: "Albanvale",
    3028: "Cairnlea",
    3029: "Albion",
    3030: "Ardeer",
    3036: "Keilor Downs",
    3037: "Sydenham",
    3042: "Airport West",
    3043: "Gladstone Park",
    3047: "Jacana",
    3049: "Meadow Heights",
    3059: "Pascoe Vale",
    3063: "Ascot Vale",
    3064: "Essendon West",
    3074: "Thomastown",
    3075: "Lalor",
    3076: "Epping",
    3082: "Heidelberg Heights",
    3133: "Nunawading",
    3134: "Ringwood",
    3135: "Ringwood North",
    3136: "Vermont",
    3137: "Ringwood East",
    3138: "Croydon",
    3152: "Mount Waverley",
    3153: "Syndal",
    3154: "Mount Waverley",
    3155: "Glen Waverley",
    3156: "Wheelers Hill",
    3158: "Jells Park",
    3160: "Brandon Park",
    3171: "Springvale",
    3174: "Springvale South",
    3175: "Dingley Village",
    3177: "Keysborough",
    3178: "Noble Park",
    3186: "Brighton East",
    3187: "Brighton East",
    3188: "Hampton",
    3189: "Moorabbin",
    3190: "Highett",
    3191: "Sandringham",
    3192: "Cheltenham",
    3198: "Frankston",
    3199: "Frankston",
    3200: "Frankston",
    3201: "Frankston",
    3750: "Wollert",
    3752: "South Morang",
    3754: "Mernda",
    3755: "Doreen",
    3757: "Mill Park",
    3803: "Berwick",
    3804: "Beaconsfield",
    3805: "Officer",
    3806: "Narre Warren",
    3807: "Narre Warren North",
    3808: "Fountain Gate",
    3809: "Hallam",
    3810: "Hampton Park",
    3910: "Langwarrin",
    3911: "Langwarrin South",
    3975: "Cranbourne",
    3976: "Cranbourne North",
    3977: "Cranbourne West",
    3978: "Cranbourne South",
    3026: "Deer Park",
    3038: "Keilor",
    3045: "Dallas",
    3048: "Broadmeadows",
    3062: "Fitzroy North",
    3139: "Kilsyth",
    3335: "Melton",
    3336: "Melton West",
    3337: "Kurunjang",
    3338: "Toolern Vale",
    3753: "Epping",
    3756: "Bundoora",
    3758: "Thomastown",
    3759: "Lalor"
};




const bookNow = async () => {
    if (booking.value) return;
    booking.value = true;
    if (!quote.value.total) {
        alert('Please get a quote first.');
        return;
    }
    const fromPostcode = selectedFrom.value ?? 0;
    const toPostcode = selectedTo.value ?? 0;

    const fromPlace = postcodeMap[fromPostcode] || '';
    const toPlace = postcodeMap[toPostcode] || '';

    const fromLabel = fromPlace ? `${fromPlace} (${fromPostcode})` : `${fromPostcode}`;
    const toLabel = toPlace ? `${toPlace} (${toPostcode})` : `${toPostcode}`;

    const productData = {
        name: `From: ${fromLabel} To: ${toLabel}`,
        type: 'simple',
        regular_price: quote.value.total.toString(),
        description: `
From: ${fromLabel}
To: ${toLabel}
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
            return
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
        // frompostcode: selectedFrom.value ,
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
                                    class="w-full lg:w-[230px] md:w-[200px] sm:w-[170px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" />
                            </div>
                            <p v-if="fromError" class="text-red-500 text-sm mt-1">{{ fromError }}</p>
                        </div>

                        <!-- To Country -->
                        <div
                            class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                            <div class="flex items-center w-full">
                                <img src="/images/home_pin.svg" class="min-w-[19px]" />
                                <input type="text" v-model="selectedTo" placeholder="To: Enter postcode" maxlength="4"
                                    id="to_country" pattern="\d*"
                                    @input="selectedTo = selectedTo?.replace(/\D/g, '').slice(0, 4)"
                                    class="w-full lg:w-[210px] md:w-[180px] sm:w-[150px] outline-none bg-transparent m-0 border-none py-[18px] pl-[14px] pr-[35px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]" />
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
                                    <NuxtLink @click.prevent="bookNow" :class="[
                                        'bg-[#141416] whitespace-nowrap text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal lg:px-[36px] px-[32px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#141416] hover:bg-white hover:border-[#141416] hover:text-[#141416] lg:mt-[0] mt-[20px] cursor-pointer',
                                        booking ? 'cursor-not-allowed' : ''
                                    ]" :disabled="booking">
                                        {{ booking ? 'Booking...' : 'Book Now' }}
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
