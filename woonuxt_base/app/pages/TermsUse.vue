<script setup>
import { useFetch } from '#app'
import { NuxtLink } from '#components';

const { data, pending, error } = await useFetch('/api/page')

</script>

<template>
    <div class="main-content bg-white">

        <section class="policies_text">
            <div class="container-terms">
                <h2>Terms and Conditions</h2>
                <p>These Terms and Conditions (“Terms”) govern your use of the website(s), e-commerce platform(s), and applications (individually and collectively, the “Site”) operated by SwiftShip Logistics. By accessing or using our Site, or by placing an order, you agree to be bound by these Terms, together with our Privacy Policy. If you do not agree, you may not use the Site or our services. These Terms may be updated at any time without prior notice.</p>
                <h3>Acceptance of Terms</h3>
                <p>Please read these Terms carefully before using our Applications. By accessing or using the Applications, you agree to be bound by these Terms (as revised from time to time). Please note that these Terms may be updated periodically, and it is your responsibility to review them regularly.</p>
                <p>Your continued use of the Applications after changes to these Terms are posted will be deemed as your acceptance of those changes. Subject to your compliance with these Terms, SwiftShip grants you a limited, revocable, non-exclusive, non-transferable license to access and use the Applications.</p>
                <h3>Eligibility to Use the Applications</h3>
                <span>To use the Platforms, you must:</span>
                <ul>
                    <li>Be over 18 years of age.</li>
                    <li>Possess the legal capacity to understand and agree to these Terms.</li>
                    <li>Follow any contractual agreements with SwiftShip, if applicable.</li>
                </ul>
                <h3>Ownership & Rights</h3>
                <ul>
                    <li>All content, including but not limited to text, images, logos, designs, software, and services available on the Platforms, is owned by SwiftShip or licensed to us.</li>
                    <li>You are prohibited from using any content for commercial purposes without our explicit written consent.</li>
                    <li>Reproducing, modifying, distributing, or otherwise exploiting any content from the Platforms without permission is prohibited.</li>
                </ul>
                <h3>Access and Use</h3>
                <ul>
                    <li>Access or attempt to access data that is not intended for you or log in to an account that you are not authorized to use.</li>
                    <li>Disrupt or interfere with the functioning of the Platforms or other users’ access by submitting malicious code like viruses or worms.</li>
                    <li>Use the Platforms for sending unsolicited emails or engaging in any spamming activity.</li>
                </ul>
                <h3>Disclaimer</h3>
                <p>The content and services available on the Platforms are provided "as is" without any representations or warranties, either express or implied. This includes, but is not limited to, any warranties related to fitness for a particular purpose. SwiftShip makes no guarantees regarding the accuracy, completeness, or reliability of the content, and reserves the right to update, modify, or improve the Platforms at any time without prior notice.
                While SwiftShip takes reasonable precautions to minimize risks, we do not guarantee that the Platforms are free from viruses or other harmful elements. Users are encouraged to take appropriate security measures when accessing and using the Platforms.</p>
                <h3>Referral & Rewards Program</h3>
                <p>SwiftShip may run a <b>Referral Incentive Program</b>, where you can refer others to become <b>SwiftShip Partners</b>. Rewards and incentives associated with these referrals are as follows:</p>
                <ul>
                    <li>
                        <b>Eligibility:</b> Referred individuals may be eligible for rewards as determined by SwiftShip.
                    </li>
                    <li>
                        <b>Eligibility:</b> Referred individuals may be eligible for rewards as determined by SwiftShip.
                    </li>
                    <li>
                        <b>Taxes and Fees:</b> You are responsible for any taxes or fees associated with rewards.
                    </li>
                    <li>
                        <b>Changes:</b> SwiftShip reserves the right to modify, suspend, or cancel the rewards program at any time without prior notice.
                    </li>
                </ul>
                <h3>User Feedback & Content</h3>
                <p>By submitting any comments, feedback, or suggestions (collectively “User Content”), you grant SwiftShip:</p>
                <ul>
                    <li>
                        <b>Ownership:</b> All worldwide rights to the User Content.
                    </li>
                    <li>
                        <b>Usage:</b> The right to use, modify, publish, distribute, and exploit the content without any compensation to you.
                    </li>
                    <li>
                        <b>Responsibility:</b> You agree that your User Content will not violate third-party rights or contain unlawful materials.
                    </li>
                </ul>
                <h3>Severability</h3>
                <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect. The invalid provision will be replaced as necessary.</p>
            </div>
        </section>

        

        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-500">Loading...</div>
        <!-- Error state -->
        <div v-if="error" class="text-center text-red-500 font-semibold">
            Error: {{ error.message }}
        </div>
    </div>
</template>
