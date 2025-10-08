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
                <p>At SwiftShip Logistics Pvt. Ltd., we are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner. 
                This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it when you use our platforms, including swiftshiplogistics.com, direct swiftshiplogistics.com, the SwiftShip Direct Mobile App, and the SwiftShip Partner App. By using our Platforms or providing us with your personal data, you agree to the terms of this Privacy Policy. We encourage you to review it carefully and regularly to stay informed about any changes.</p>
                <h3>Information We Collect</h3>
                <p>We collect both Personal Information and Non-Personal Information when you use our Platforms. This information is collected when you:</p>
                <ul>
                    <li>Register or create an account on the Platforms.</li>
                    <li>Place an order or request services.</li>
                    <li>Communicate with us via email, phone, or through our customer service team.</li>
                    <li>Participate in surveys, promotions, or feedback requests.</li>
                </ul>
                <h3>Personal Information</h3>
                <p>Personal data refers to any information that can be used to identify you personally. The types of personal data we collect include:</p>
                <ul>
                    <li><b>Contact Information:</b>  Name, email address, phone number, shipping and billing addresses.</li>
                    <li><b>Account Information:</b> Username, password, and other details associated with your account.</li>
                    <li><b>Transaction Information:</b> Order details, payment information, billing information, and delivery preferences.</li>
                    <li><b>Communication Data:</b> Messages, feedback, and any other communications you send us.</li>
                    <li><b>Referral Information:</b> Details of referrals you make through any referral programs.</li>
                </ul>
                <h3>Non-Personal Information</h3>
                <p>This refers to data that cannot directly identify you. We collect non-personal information to help improve the functionality of our Platforms. Examples include:</p>
                <ul>
                    <li><b>Technical Data:</b> Device type, IP address, browser type, and operating system.</li>
                    <li><b>Usage Data:</b> How you interact with the Platforms, pages visited, time spent on the Platforms, and search queries.</li>
                </ul>
                <h3>Non-Personal Information</h3>
                <p>This refers to data that cannot directly identify you. We collect non-personal information to help improve the functionality of our Platforms. Examples include:</p>
                <ul>
                    <li>
                        <b>Technical Data:</b> Device type, IP address, browser type, and operating system.
                    </li>
                    <li>
                        <b>Usage Data:</b> How you interact with the Platforms, pages visited, time spent on the Platforms, and search queries.
                    </li>
                </ul>
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>
                        <b>To Provide Services:</b> Process orders, payments, deliveries, and communicate with you about your transactions.
                    </li>
                    <li>
                        <b>Customer Support:</b> Respond to your inquiries, resolve issues, and improve our customer service experience.
                    </li>
                    <li>
                        <b>Improve Our Platforms:</b> Analyze usage patterns to enhance the functionality and usability of our Platforms.
                    </li>
                    <li><b>Marketing and Promotions:</b> Send you promotional messages, newsletters, and updates related to SwiftShip’s services. You may opt-out of receiving marketing communications at any time.</li>
                </ul>
                <h3>Security of Your Information</h3>
                <p>We take appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure servers.
                However, please note that no method of transmission over the internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.</p>
                <h3>Cookies and Tracking Technologies</h3>
                <p>We take appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure servers.
                However, please note that no method of transmission over the internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.</p>
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
