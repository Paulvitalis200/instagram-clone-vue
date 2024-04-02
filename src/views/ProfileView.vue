
<script setup>
import Profile from '@/components/Profile.vue';
</script>
<template>

<Profile :key="$route.params.username"/>

</template>

<style scoped>
.profile-container {
   display: flex;
   flex-direction: column;
   padding: 20px 0;
}

</style>