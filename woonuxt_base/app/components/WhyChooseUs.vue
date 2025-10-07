<script setup>

const chooses = [
  {
    icon: "/images/d_truck_speed.svg",
    title: "Next-Day Delivery",
    description: "Next-day delivery with speed and precision, every time."
  },
  {
    icon: "/images/south_america.svg",
    title: "Wide Coverage",
    description: "Shipping parcels nationwide, wherever you need."
  },
  {
    icon: "/images/verified_user2.svg",
    title: "Trusted & Reliable",
    description: "Secure, hassle-free shipments you can trust."
  },
  {
    icon: "/images/energy_progrm.svg",
    title: "Eco-Friendly",
    description: "Sustainable shipping with minimal impact."
  }
]

</script>

<template>
    <section>
      <div class="container">
        <div class="bg-[#fff] py-[50px] md:py-[100px] w-full">
          <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] leading-[normal]">
            Why choose us?
          </h2>

          <div class="flex gap-[20px] flex-wrap mt-[40px] w-full">
            <div v-for="(choose, index) in chooses" :key="index"
              class="bg-[#F3F3F3] border border-[#F3F3F3] rounded-[10px] px-[30px] py-[40px] pb-[35px] w-full lg:max-w-[calc(25%_-_15px)] md:max-w-[calc(50%_-_10px)] max-w-[100%]">
              <div class="">
                <img :src="choose.icon" class="max-w-[60px]" />
                <h3 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[24px] text-[20px] leading-[normal] mt-[25px]">
                  {{ choose.title }}
                </h3>
                <p class="text-[#141416] font-[Avenir] font-[400] lg:text-[18px] text-[16px] leading-[29px] mt-[18px]">
                  {{ choose.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
