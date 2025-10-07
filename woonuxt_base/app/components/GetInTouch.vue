<script setup>
import { NuxtLink } from '#components';

</script>

<template>
    <section class="bg-[#fafafa] lg:py-[100px] py-[50px]">
      <div class="container">
        <div class="flex flex-wrap justify-between lg:gap-[152px] gap-[50px] items-center">
          <div class="w-full lg:max-w-[calc(50%_-76px)] max-w-[100%]">
            <span class="text-[#248BC6] font-[Avenir] font-[700] text-[18px] leading-[34px] uppercase">
              Lets connected
            </span>
            <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[58px] md:leading-[40px] leading-[normal] mt-[8px] w-full lg:max-w-[420px]">
              Have questions or need assistance?
            </h2>
            <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[20px]">
              We’re here to help! Fill out the form below, and our team will get back to you as soon as possible
            </p>
            <ul class="flex flex-col gap-[22px] mt-[40px]">
              <li>
                <a href="tel:813-405-1455"
                  class="flex items-center gap-[15px] text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] hover:underline">
                  <img src="/images/call1.svg" />
                  <span>813-405-1455</span>
                </a>
              </li>
              <li>
                <a href="mailto:swiftship@gmail.com"
                  class="flex items-center gap-[15px] text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] hover:underline">
                  <img src="/images/mail.svg" />
                  <span>swiftship@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="#"
                  class="flex items-center gap-[15px] text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] hover:underline">
                  <img src="/images/location_on.svg" />
                  <span>123 Elm St, Springfield, IL 62704, Australia</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="w-full lg:max-w-[calc(50%_-76px)] max-w-[100%]">
            <div class="bg-white border border-[#00000026] rounded-[20px] md:px-[40px] px-[20px] md:py-[42px] py-[25px]">
              <h2 class="text-[#141416] font-[PingLCG] font-[800] lg:text-[44px] md:text-[30px] text-[28px] lg:leading-[58px] md:leading-[48px] leading-[normal]">
                Get In Touch.
              </h2>
              <p class="text-[#141416] font-[Avenir] font-[400] md:text-[18px] text-[16px] md:leading-[29px] leading-[26px] mt-[10px]">
                Our Team Is Here to Help You Every Step of the Way!
              </p>
              <form class="mt-[35px]">
                <div class="flex gap-[12px]">
                  <label class="block w-full">
                    <input type="text" name="name" placeholder="Name"
                      class="border border-[#0000001a] br-[#FAFAFA] md:px-[25px] px-[20px] md:py-[12px] py-[10px] text-[#151515] text-[16px] font-[400] font-[Avenir] leading-[28px] placeholder:text-[#15151580] rounded-[6px] w-full" />
                  </label>
                  <label class="block w-full">
                    <input type="email" name="email" placeholder="Email"
                      class="border border-[#0000001a] br-[#FAFAFA] md:px-[25px] px-[20px] md:py-[12px] py-[10px] text-[#151515] text-[16px] font-[400] font-[Avenir] leading-[28px] placeholder:text-[#15151580] rounded-[6px] w-full" />
                  </label>
                </div>
                <label class="block w-full mt-[12px]">
                  <input type="text" name="subject" placeholder="Subject"
                    class="border border-[#0000001a] br-[#FAFAFA] md:px-[25px] px-[20px] md:py-[12px] py-[10px] text-[#151515] text-[16px] font-[400] font-[Avenir] leading-[28px] placeholder:text-[#15151580] rounded-[6px] w-full" />
                </label>
                <label class="block w-full mt-[12px]">
                  <textarea name="message" placeholder="Write Your Message..."
                    class="border border-[#0000001a] br-[#FAFAFA] md:px-[25px] px-[20px] md:py-[12px] py-[10px] text-[#151515] text-[16px] font-[400] font-[Avenir] leading-[28px] placeholder:text-[#15151580] rounded-[6px] w-full"></textarea>
                </label>
                <NuxtLink
                  class="px-4 py-2 bg-[#248BC6] text-white rounded-[6px] font-[PingLCG] font-[500] text-[16px] leading-normal px-[36px] md:py-[16px] py-[12px] md:h-[57px] h-auto border border-[#248BC6] hover:bg-white hover:border-[#14141633] hover:text-[#141416] cursor-pointer text-center block w-full mt-[25px]">
                  Send Message
                </NuxtLink>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
</template>