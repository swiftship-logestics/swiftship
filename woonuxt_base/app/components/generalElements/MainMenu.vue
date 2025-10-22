<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';
import { useRouter } from "vue-router";

interface MenuData {
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
}



// const { data, pending, error } = await useFetch<MenuData>('/api/mainmenu');

interface ParsedMenu {
  logo: { text: string; href: string } | null;
  items: { label: string; href: string }[];
  button: { label: string; href: string } | null;
}

// const menuItems = ref<ParsedMenu>({
//   logo: null,
//   items: [],
//   button: null
// });

const menuItems = ref<ParsedMenu>({
  logo: { text: 'Logo', href: '/' },
  items: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Tracking', href: '/tracking' },
    { label: 'Contact us', href: '/contact-us' }
  ],
  button: { label: 'Get a quote', href: '/getquote' }
});

// onMounted(() => {
//   if (!data.value?.content?.rendered) return;

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(data.value.content.rendered, 'text/html');

//   const logoEl = doc.querySelector('.wp-block-site-title a') as HTMLAnchorElement | null;
//   const logo = logoEl ? { text: logoEl.textContent || 'Logo', href: logoEl.href || '/' } : null;

//   const items: { label: string; href: string }[] = [];
//   doc.querySelectorAll('.wp-block-navigation__container li a').forEach((a) => {
//     const anchor = a as HTMLAnchorElement;
//     if (anchor.href && anchor.textContent) {
//       items.push({ label: anchor.textContent, href: anchor.href });
//     }
//   });

//   const buttonEl = doc.querySelector('.wp-block-button a') as HTMLAnchorElement | null;
//   const button = buttonEl
//     ? { label: buttonEl.textContent || 'Click', href: buttonEl.href || '#' }
//     : null;

//   menuItems.value = { logo, items, button };
// });

const getMenuLink = (index: number, originalHref: string) => {
  switch (index) {
    case 0:
      return '/'
    case 1:
      return '/services';;
    case 2:
      return '/about';
    case 3:
      return '/faq';
    case 4:
      return '/tracking';
    case 5:
      return '/contact-us';
    default:
      return originalHref;
  }
};

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (val) => {
  if (val) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
});

// Close menu on route change
const router = useRouter();
router.afterEach(() => {
  isOpen.value = false;
  document.body.classList.remove("menu-open");
});

</script>

<template>
  <div class="flex justify-between w-full md:pb-[17px] pb-[15px]">
    <div class="flex items-center pt-[8px]">
      <NuxtLink v-if="menuItems.logo" to="/"
        class="font-bold text-xl md:max-w-[100%] max-w-[86px] md:min-w-[auto] min-w-[86px] md:max-h-[none] max-h-[80px] md:min-h-[auto] min-h-[80px] object-cover">
        <!-- {{ menuItems.logo.text }} -->
        <img src="/images/Frame 1171280212.png" class="" />
      </NuxtLink>
    </div>

    <div class="w-full md:pl-[46px] pl-[40px] md:block flex justify-end items-center" v-if="menuItems.button">
      <div class="top_bar md:flex hidden items-center justify-end gap-[26px] py-[12px] bg-[#EEF9FF]">
        <NuxtLink to="/tracking"
          class="flex items-center gap-[10px] text-[#141416] font-[PingLCG] font-[700] text-[14px] leading-normal cursor-pointer">
          <span class="icon">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.86667 12.4997L10.6667 3.69967V11.583H12.5V0.583008H1.5V2.41634H9.38333L0.583334 11.2163L1.86667 12.4997Z"
                fill="#141416" />
            </svg>
          </span>
          <span>
            Track your order
          </span>
        </NuxtLink>
        <div
          class="flex items-center gap-[10px] text-[#141416] font-[PingLCG] font-[700] text-[14px] leading-normal cursor-pointer">
          <span class="icon">
            <img src="/images/user_icon.svg" />
          </span>
          <NuxtLink to="/my-account">Sign in</NuxtLink>
          <span>/</span>
          <NuxtLink to="/my-account?action=register">Register</NuxtLink>
        </div>
      </div>
      <div class="md:flex items-center justify-between w-full pt-[16px] hidden">
        <nav class="flex flex-wrap lg:gap-[42px] gap-[25px] items-center main_menu">
          <NuxtLink v-for="(item, index) in menuItems.items" :key="item.href" :to="getMenuLink(index, item.href)"
            class="text-[#141416] font-[PingLCG] font-[700] text-[16px] leading-normal hover:text-[#2689C6]">
            {{ item.label }}
          </NuxtLink>
        </nav>
        <NuxtLink to="/getquote"
          class="bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] lg:text-[16px] text-[15px] leading-normal lg:px-[36px] px-[24px] lg:py-[16px] py-[10px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer">
          {{ menuItems.button.label }}
        </NuxtLink>
      </div>

      <!-- Mobile Hamburger -->
      <div class="leading-[0]">
        <button @click="isOpen = !isOpen" class="md:hidden text-gray-700 focus:outline-none">
          <!-- Icon -->
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Close Icon -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        class="md:hidden block fixed right-0 left-0 top-[100px] bottom-0 h-[calc(100vh_-_100px)] overflow-auto px-[20px] py-[20px] bg-white transition-all duration-300"
        :class="isOpen ? 'translate-x-0' : '-translate-x-[-100%]'">
        <nav class="flex flex-col gap-[15px] main_menu">
          <NuxtLink v-for="(item, index) in menuItems.items" :key="item.href" :to="getMenuLink(index, item.href)"
            class="text-[#141416] font-[PingLCG] font-[700] text-[16px] leading-normal hover:text-[#2689C6]">
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="flex flex-col gap-[15px] mt-[30px]">
          <NuxtLink to="/tracking"
            class="flex items-center gap-[10px] text-[#141416] font-[PingLCG] font-[700] text-[14px] leading-normal cursor-pointer">
            <span class="icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.86667 12.4997L10.6667 3.69967V11.583H12.5V0.583008H1.5V2.41634H9.38333L0.583334 11.2163L1.86667 12.4997Z"
                  fill="#141416" />
              </svg>
            </span>
            <span>
              Track your order
            </span>
          </NuxtLink>
          <div
            class="flex items-center gap-[10px] text-[#141416] font-[PingLCG] font-[700] text-[14px] leading-normal cursor-pointer">
            <span class="icon">
              <img src="/images/user_icon.svg" />
            </span>
            <NuxtLink to="/my-account">Sign in</NuxtLink>
            <span>/</span>
            <NuxtLink to="/my-account?action=register">Register</NuxtLink>
          </div>
        </div>
        <NuxtLink :to="menuItems.button.href"
          class="block mt-[30px] bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] lg:text-[16px] text-[15px] leading-normal lg:px-[36px] px-[24px] lg:py-[16px] py-[12px] lg:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer text-center">
          {{ menuItems.button.label }}
        </NuxtLink>
      </div>

    </div>

  </div>

  <!-- <div v-if="pending" class="text-gray-500 mt-2">Loading menu...</div>
  <div v-if="error" class="text-red-500 mt-2">Error: {{ error.message }}</div> -->
</template>
