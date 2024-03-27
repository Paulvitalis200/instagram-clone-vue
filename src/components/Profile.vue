
<script setup>
import Container from '@/components/Container.vue';
import UserBar from '../components/UserBar.vue'
import ImageGallery from './ImageGallery.vue';
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import {supabase} from '../supabase'

const route = useRoute()
const user = ref(null)
const {username} = route.params
const posts = ref([])
const loading = ref(false)

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async() => {
    loading.value = true
 const {data: userData} = await supabase.from("users").select().eq('username', username).single()

 if(!userData) {
    loading.value = false
    return user.value = null
 }

user.value = userData

 const {data: postData} = await supabase.from("posts").select().eq("owner_id", user.value.id)
 posts.value = postData
 loading.value = false
}

onMounted(() => {
    fetchData()
})
</script>
<template>
<Container>
    <div class="profile-container" v-if="!loading">
        <UserBar :user="user"  :key="$route.params.username" :userInfo="{
            posts: 4,
            following: 100,
            followers: 50
        }"
        :addNewPost="addNewPost"/>
       <ImageGallery 
        :posts="posts"
       />
    </div>
    <div class="spinner" v-else>
        <a-spin></a-spin>
    </div>
</Container>

</template>

<style scoped>
.profile-container {
   display: flex;
   flex-direction: column;
   padding: 20px 0;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
}
</style>