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

const validateFrom = () => {
    const code = Number(selectedFrom.value)
    if (selectedFrom.value.length === 4) {
        fromError.value = postalCodesMapping[code] ? '' : 'This postcode is not available'
    } else {
        fromError.value = ''
    }
}

const validateTo = () => {
    const code = Number(selectedTo.value)
    if (selectedTo.value.length === 4) {
        toError.value = postalCodesMapping[code] ? '' : 'This postcode is not available'
    } else {
        toError.value = ''
    }
}


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
        value: code,
        label: `${code} - ${name}`
    })
)

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
  if (!selectedFrom.value || !selectedTo.value || !weight.value || !length.value || !width.value || !height.value) {
        toast.error("Please complete all fields and provide parcel dimensions.")
        return
    }
    const fromCode = Number(selectedFrom.value)
    const toCode = Number(selectedTo.value)

    if (!postalCodesMapping[fromCode]) {
        fromError.value = 'This postcode is not available'
    } else {
        fromError.value = ''
    }

    if (!postalCodesMapping[toCode]) {
        toError.value = 'This postcode is not available'
    } else {
        toError.value = ''
    }

    if (fromError.value || toError.value) {
        return
    }


    if (isNaN(weight.value)) {
        toast.error("Weight must be a number")
        return
    }

    if (weight.value > 22) {
        weightError.value = 'Weight must not exceed 22 kg'
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
    } catch (error) {
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
                                class="w-full lg:w-[230px] md:w-[200px] sm:w-[170px] outline-none bg-transparent m-0 border-gray-300 py-[18px] pl-[14px] pr-[14px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]"
                                @input="validateFrom" />
                        </div>
                        <p v-if="fromError" class="text-red-500 text-sm mt-1">{{ fromError }}</p>
                    </div>

                    <!-- To Country -->
                    <div
                        class="flex flex-col items-center lg:border-r border-r-0 border-[#D9D9D9] lg:pr-[24px] pr-[0] lg:mr-[24px] mr-[0]">
                        <div class="flex items-center w-full">
                            <img src="/images/home_pin.svg" class="min-w-[19px]" />
                            <input type="text" v-model="selectedTo" placeholder="To: Enter postcode" maxlength="4"
                                class="w-full lg:w-[210px] md:w-[180px] sm:w-[150px] outline-none bg-transparent m-0 border-gray-300 py-[18px] pl-[14px] pr-[14px] text-[#646464] font-[PingLCG] font-[500] text-[15px] leading-[normal]"
                                @input="validateTo" />
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
