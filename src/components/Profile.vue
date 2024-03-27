
<script setup>
import Container from '@/components/Container.vue';
import UserBar from '../components/UserBar.vue'
import ImageGallery from './ImageGallery.vue';
import { ref } from "vue"

const posts = ref([])

const addNewPost = (post) => {
    posts.value.unshift(post)
}
</script>
<template>
<Container>
    <div class="profile-container">
        <UserBar username="petey_pablo" :key="$route.params.username" :userInfo="{
            posts: 4,
            following: 100,
            followers: 50
        }"
        :addNewPost="addNewPost"/>
       <ImageGallery 
        :posts="posts"
       />
    </div>
</Container>

</template>

<style scoped>
.profile-container {
   display: flex;
   flex-direction: column;
   padding: 20px 0;
}

</style>