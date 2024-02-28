<script  setup>
import { ref } from 'vue';

const props = defineProps(['isLogIn'])
const open = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e) => {
  console.log(e);
  open.value = false;
};

const title = props.isLogIn ? 'Sign In' : 'Sign Up'
</script>

<template>
    <div>
      <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
      <a-modal v-model:open="open" :title="title" @ok="handleOk">
        <a-input class="input" v-if="!isLogIn" v-model:value="value" placeholder="Username" />
        <a-input class="input" v-model:value="value" placeholder="Email" />
        <a-input class="input" v-model:value="value" placeholder="Password" />
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
</style>