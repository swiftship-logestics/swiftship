<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();
const { wishlistLink } = useAuth();
</script>

<template>
  <footer class="bg-[#161616] order-last">
    <div class="container">
      <div class="flex flex-wrap md:py-[100px] py-[50px] justify-between md:gap-[0] gap-[50px]">
        <div class="w-auto max-w-[400px]">
          <Logo />
          <WebsiteShortDescription />
          <!-- <LangSwitcher class="mt-8" /> -->
          <SocialIcons />
        </div>
        <div class="w-auto">
          <div class="">
            <h3 class="text-[#FFFFFF] font-[PingLCG] font-[700] text-[16px] leading-[normal] uppercase">
              Quick links
            </h3>
          </div>
          <div class="">
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Home</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Services</a>
            <a href="/" class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">About
              us</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">FAQ</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Tracking</a>
          </div>
        </div>
        <div class="w-auto">
          <div class="">
            <h3 class="text-[#FFFFFF] font-[PingLCG] font-[700] text-[16px] leading-[normal] uppercase">
              Leqal
            </h3>
          </div>
          <div class="">
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Privacy
              Policy</a>
            <a href="/" class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Terms
              of Use</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Cookie
              Settings</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Shipping
              Policy</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Tracking</a>
          </div>
          <!-- <div class="text-sm">
            <NuxtLink to="/products" class="py-1.5 block text-white">{{ $t('messages.shop.newArrivals') }}</NuxtLink>
            <NuxtLink to="/products?filter=sale[true]" class="py-1.5 block text-white">On sale</NuxtLink>
            <NuxtLink to="/products?orderby=rating&order=ASC&filter=rating[1]" class="py-1.5 block text-white">Top rated
            </NuxtLink>
            <a href="/" class="py-1.5 block">{{ $t('messages.shop.giftCards') }}</a>
          </div> -->
        </div>
        <div class="w-auto">
          <div class="">
            <h3 class="text-[#FFFFFF] font-[PingLCG] font-[700] text-[16px] leading-[normal] uppercase">
              Services
            </h3>
          </div>
          <div class="">
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Domestic
              Delivery</a>
            <a href="/"
              class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Express
              Delivery</a>
            <a href="/" class="block text-[#FFFFFF] font-[Avenir] font-[400] text-[18px] leading-[29px] md:mt-[35px] mt-[20px]">Bulk
              & Business</a>
          </div>
          <!-- <div class="mb-1 font-semibold text-white">{{ $t('messages.general.customerService') }}</div> -->
          <!-- <div class="text-sm">
            <NuxtLink to="/contact" class="py-1.5 block text-white">Contact Us</NuxtLink>
            <a href="/" class="py-1.5 block text-white">Shipping & Returns</a>
            <a href="/" class="py-1.5 block text-white">Privacy Policy</a>
            <a href="/" class="py-1.5 block text-white">Terms & Conditions</a>
          </div> -->
        </div>
        <!-- <div class="w-auto">
        <div class="mb-1 font-semibold">{{ $t('messages.account.myAccount') }}</div>
          <div class="text-sm">
            <NuxtLink to="/my-account/" class="py-1.5 block">{{ $t('messages.account.myAccount') }}</NuxtLink>
            <NuxtLink to="/my-account/?tab=orders" class="py-1.5 block">{{ $t('messages.shop.orderHistory') }}</NuxtLink>
            <NuxtLink :to="wishlistLink" class="py-1.5 block">{{ $t('messages.shop.wishlist') }}</NuxtLink>
            <a href="/" class="py-1.5 block">{{ $t('messages.general.newsletter') }}</a>
          </div>
        </div> -->
      </div>
    </div>
    <div class="border-t border-[#ffffff1a]">
      <div class="container">
        <div class="flex items-center justify-center">
          <div class="copywrite">
            <p class="text-center text-[#ffffff85] font-[Avenir] font-[500] text-[16px] leading-[32px] py-[23px]">
              Copyrights © 2025 SwiftShip.
              <!-- <a href="https://woonuxt.com" :title="`WooNuxt v${wooNuxtVersionInfo}`">
                {{ `WooNuxt v${wooNuxtVersionInfo}` }}
              </a>
              - by
              <a href="https://scottyzen.com" title="Scott Kennedy - Web Developer" target="_blank">Scott Kennedy</a> -->
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
