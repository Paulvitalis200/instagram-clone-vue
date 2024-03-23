<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
const open = ref(false);

const caption = ref("")
const file = ref(null)
const showModal = () => {
  open.value = true;
};

const handleOk = async (e) => {
    const fileName = Math.floor(Math.random() * 10000000000000000000)
 if(file.value) {
    const response = await supabase.storage.from("images").upload('public/' + fileName, file.value)
    console.log("RESPONSE: ", response)
 }
};

const handleUploadChange = (e) => {
    console.log(e)
    if (e.target.files[0]) {
        file.value = e.target.files[0]
    }
}
</script>


<template>
    <div>
      <a-button @click="showModal">Upload Photo</a-button>
      <a-modal v-model:open="open" title="Upload Photo" @ok="handleOk">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
        <a-input v-model:value="caption" placeholder="Caption..." :maxLength="50"/>
      </a-modal>
    </div>
  </template>
<style scoped>
input {
    margin-top: 10px;
}
</style>