<script setup>
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const open = ref(false);

const userStore = useUserStore()
const loading = ref(false)
const {user} = storeToRefs(userStore)
const caption = ref("")
const errorMessage = ref("")
const file = ref(null)
const props = defineProps(['addNewPost'])
const showModal = () => {
  open.value = true;
};

const handleOk = async (e) => {
  loading.value = true
  let filePath;
    const fileName = Math.floor(Math.random() * 10000000000000000000)
 if(file.value) {
    const {data, error} = await supabase.storage.from("images").upload('public/' + fileName, file.value)

    if (error) {
      loading.value = false
      return errorMessage.value = "Unable to load image"
    }
    filePath = data.path
      await supabase.from("posts").insert({
        url:filePath,
        caption: caption.value,
        owner_id: user.value.id
      })
    

 }
 loading.value = false
 open.value = false
 caption.value = ""
 props.addNewPost({
      url: filePath,
      caption: caption.value,
       owner_id: user.value.id
 })
};

const handleUploadChange = (e) => {
    if (e.target.files[0]) {
        file.value = e.target.files[0]
    }
}
</script>


<template>
    <div>
      <a-button @click="showModal">Upload Photo</a-button>
     
        <a-modal v-model:open="open" title="Upload Photo" @ok="handleOk">
          <div v-if="!loading">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
        <a-input v-model:value="caption" placeholder="Caption..." :maxLength="50"/>
      </div>
      <div class="spinner" v-else>
        <a-spin></a-spin>
      </div>
        </a-modal>
        <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
     
      
    </div>
  </template>
<style scoped>
input {
    margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>