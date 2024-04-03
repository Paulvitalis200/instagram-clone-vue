<script  setup>
import { ref, reactive } from 'vue';
import {useUserStore} from "../stores/user"
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const  {errorMessage, loading, user} = storeToRefs(userStore)
const props = defineProps(['isLogIn'])
const open = ref(false);

const userCredentials = reactive({
  email: "",
  password: "",
  username: ""
})
const showModal = () => {
  open.value = true;
  
};

const handleOk = async (e) => {
  if (props.isLogIn) {
    await userStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email
    })
  } else {
    await userStore.handleSignup(userCredentials)
  }
 
  if (user.value) {
    open.value = false
    clearUserCredentials()
  }
};

const clearUserCredentials = () => {
  userCredentials.email = ""
    userCredentials.password = ""
    userCredentials.username = ""
    userStore.clearErrorMessage()
}
const handleCancel = () => {
  clearUserCredentials()
  open.value = false
}
const title = props.isLogIn ? 'Sign In' : 'Sign Up'
</script>

<template>
  
    <div>
      <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
      <a-modal v-model:open="open" :title="title" @ok="handleOk">
        
        <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :disabled="loading" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <div v-if="!loading" class="input-container">
        <a-input class="input" v-if="!isLogIn" v-model:value="userCredentials.username" placeholder="Username" />
        <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
        <a-input class="input" v-model:value="userCredentials.password" placeholder="Password" type="password"/>
      </div>
      <div class="spinner" v-else>
        <a-spin></a-spin>
      </div>
        <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
      </a-modal>
    </div>
  </template>
 
  <style scoped>
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>