<template>
  <div class="max-w-lg mx-auto my-16 min-h-[600px] text-center align-center flex flex-col justify-center">
    <div class="flex flex-col my-8">
      <h1 class="text-xl font-semibold lg:text-3xl">{{ formTitle }}</h1>
      <p v-if="formView === FormView.LOGIN" class="text-gray-500 mt-2">
        {{ $t('messages.account.noAccount') }}
        <a class="font-semibold cursor-pointer text-primary" @click="navigate(FormView.REGISTER)"> {{
          $t('messages.account.accountRegister') }} </a>.
      </p>
      <p v-else-if="formView === FormView.REGISTER" class="text-gray-500 mt-2">
        {{ $t('messages.account.hasAccount') }}
        <a @click="navigate(FormView.LOGIN)" class="text-primary text-semibold cursor-pointer">Sign in</a>.
      </p>
    </div>

    <LoginProviders class="mb-8" v-if="formView === FormView.LOGIN || formView === FormView.REGISTER" />

    <form @submit.prevent="handleFormSubmit(userInfo)">
      <p v-if="formView === FormView.FORGOT_PASSWORD" class="text-sm text-gray-500 mb-8">{{
        $t('messages.account.enterEmailOrUsernameForReset') }}</p>
      <input v-if="formView === FormView.REGISTER || formView === FormView.FORGOT_PASSWORD" id="email"
        v-model="userInfo.email" :placeholder="inputPlaceholder.email" autocomplete="email" type="text" required />
      <div v-if="formView !== FormView.FORGOT_PASSWORD">
        <input v-model="userInfo.username" :placeholder="inputPlaceholder.username" autocomplete="username" type="text"
          required />
        <PasswordInput className="border rounded-lg w-full p-3 px-4 bg-white " v-model="userInfo.password"
          :placeholder="passwordLabel" :autocomplete="formView === FormView.LOGIN ? 'current-password' : 'new-password'"
          :required="true" />
      </div>
      <!-- <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="my-4 text-sm text-green-500" v-html="message"></div>
      </Transition> -->

      <!-- Login button -->
      <button type="submit" :disabled="isPending" :class="[
        'flex items-center justify-center gap-4 my-6 text-lg w-full py-3 rounded-lg font-bold',
        isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900 text-white'
      ]">
        <LoadingIcon v-if="isPending" stroke="4" size="16" color="#fff" />
        <span>{{ buttonText }}</span>
      </button>

      <div class="flex items-center justify-between mt-4" v-if="formView === FormView.LOGIN">
        <!-- <div class="font-semibold cursor-pointer text-sm text-primary hover:text-primary" @click="navigate(FormView.FORGOT_PASSWORD)">Forgot password?</div> -->
        <!-- <div class="font-semibold cursor-pointer text-sm text-primary hover:text-primary">Forgot password?</div> -->

      </div>
    </form>

    <div class="my-8 text-center cursor-pointer" @click="navigate(FormView.LOGIN)"
      v-if="formView === FormView.FORGOT_PASSWORD">
      {{ $t('messages.account.backToLogin') }}
    </div>

    <Transition name="scale-y" mode="out-in">
      <div v-if="errorMessage" class="my-4 text-sm text-red-500" v-html="errorMessage"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
import { useToast } from '../../composables/useToast'
const toast = useToast()
const { loginUser, logoutUser, isPending, registerUser, sendResetPasswordEmail, viewer } = useAuth();

enum FormView {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgotPassword',
}

const userInfo = ref<UserInfo>({ email: '', password: '', username: '' });
const formView = ref<FormView>(FormView.LOGIN);
const message = ref<string>('');
const errorMessage = ref<string>('');

const updateFormView = () => {
  // Reset error message on view changes
  errorMessage.value = '';

  if (route.query.action === FormView.FORGOT_PASSWORD) {
    formView.value = FormView.FORGOT_PASSWORD;
  } else if (route.query.action === FormView.REGISTER) {
    formView.value = FormView.REGISTER;
  } else {
    formView.value = FormView.LOGIN;
  }
};
watch(route, updateFormView, { immediate: true });

const login = async (userInfo: UserInfo) => {
  const { success, error } = await loginUser(userInfo);
  if (error) {
    switch (error) {
      case 'invalid_username':
        // errorMessage.value = t('messages.error.invalidUsername');
        toast.error("Email not found. Please check and try again.")
        break;
      case 'incorrect_password':
        // errorMessage.value = t('messages.error.incorrectPassword');
        toast.error("Incorrect password. Please try again.")
        break;
      default:
        // errorMessage.value = error ?? '';
        // toast.error(error || "Invalid email or password. Please try again.")
        toast.error("Login failed. Please check your email and password and try again.");
        break;
    }
  }

  if (success) {
    errorMessage.value = '';
    // message.value = t('messages.account.loggingIn');
    toast.success('You have logged in successfully! 🎉');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

};

// // Pre-fill login credentials for testing
// userInfo.value = {
//   username: 'user', // or your test username
//   email: 'user@mailinator.com',    // optional, only used if backend requires it
//   password: 'tbi96@981',           // test password
// };

// // Automatically log in on form submit for testing
// const handleFormSubmit = async () => {
//   console.log('Submitting static login:', JSON.stringify(userInfo.value));
//   const { success, error } = await loginUser(userInfo.value);

//   if (success) {
//     message.value = t('messages.account.loggingIn');
//     errorMessage.value = '';
//     console.log('Login successful!');
//   } else {
//     errorMessage.value = error ?? 'Unknown error';
//     console.log('Login failed:', errorMessage.value);
//   }
// };


const handleFormSubmit = async (userInfo: UserInfo) => {

  if (formView.value === FormView.REGISTER) {
    const username =  `${userInfo.username}${Math.random().toString(36).substring(2, 6)}`;
    const registerPayload: UserInfo = {
      ...userInfo,
      username,
    };
    const { success, error } = await registerUser(registerPayload);
    if (success) {
      errorMessage.value = '';
      // message.value = t('messages.account.accountCreated') + ' ' + t('messages.account.loggingIn');
      toast.success("Your account has been created successfully!")
      isPending.value = false;
      await logoutUser();
      setTimeout(() => {
        // login(userInfo);
        window.location.href = '/my-account';
      }, 2000);
    } else {
      // errorMessage.value = error ?? '';
      toast.error(error || "Registration failed. Please try again.")
    }
  } else if (formView.value === FormView.FORGOT_PASSWORD) {
    resetPassword(userInfo);
  } else {
    login(userInfo);

  }
};

const resetPassword = async (userInfo: UserInfo) => {
  const { success, error } = await sendResetPasswordEmail({ username: userInfo.email });
  if (success) {
    errorMessage.value = '';
    message.value = t('messages.account.ifRegistered');
  } else {
    errorMessage.value = error ?? '';
  }
};

const navigate = (view: FormView) => {
  formView.value = view;
  userInfo.value = { email: '', username: '', password: '' };
  errorMessage.value = '';
  message.value = '';
  if (view === FormView.FORGOT_PASSWORD) {
    router.push({ query: { action: 'forgotPassword' } });
  } else if (view === FormView.REGISTER) {
    router.push({ query: { action: 'register' } });
  } else {
    router.push({ query: {} });
  }
};

const formTitle = computed(() => {
  if (formView.value === FormView.LOGIN) {
    return t('messages.account.loginToAccount');
  } else if (formView.value === FormView.REGISTER) {
    return t('messages.account.accountRegister');
  } else if (formView.value === FormView.FORGOT_PASSWORD) {
    return t('messages.account.forgotPassword');
  }
});

const buttonText = computed(() => {
  if (formView.value === FormView.LOGIN) {
    return t('messages.account.login');
  } else if (formView.value === FormView.REGISTER) {
    return t('messages.account.register');
  } else if (formView.value === FormView.FORGOT_PASSWORD) {
    return t('messages.account.sendPasswordResetEmail');
  }
});

const emailLabel = computed(() => (formView.value === FormView.REGISTER ? t('messages.billing.email') : t('messages.account.emailOrUsername')));
const usernameLabel = computed(() => (formView.value === FormView.LOGIN ? t('messages.account.emailOrUsername') : t('messages.account.username')));
const passwordLabel = computed(() => t('messages.account.password'));

const inputPlaceholder = computed(() => {
  return {
    email: 'Enter email',
    username: formView.value === FormView.LOGIN ? 'Enter email' : 'Enter name',
    password: '********',
  };
});
</script>

<style lang="postcss" scoped>
input[type='text'],
input[type='password'],
button {
  @apply border rounded-lg mb-4 w-full p-3 px-4 bg-white;
}

form button {
  @apply rounded-lg font-bold bg-gray-800 text-white py-3 px-8 hover:bg-gray-800;
}
</style>
