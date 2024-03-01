
<script setup>
import Container from '@/components/Container.vue';
import UserBar from '../components/UserBar.vue'
import ImageGallery from './ImageGallery.vue';
</script>
<template>
<Container>
    <div class="profile-container">
        <UserBar username="petey_pablo" :userInfo="{
            posts: 4,
            following: 100,
            followers: 50
        }"/>
       <ImageGallery 
        :posts="[{
            id: 1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfVMx1h1y8SyO7FaxEOGXxRlKFpKGPzyVdLA&s'
        },
        {
            id: 2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWROdLDes20YCR-C9FdSLF7FLOMkb4iZgBQ&s'
        }]"
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