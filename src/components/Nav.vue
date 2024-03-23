<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Container from './Container.vue'
import AuthModal from './AuthModal.vue';
import {ref} from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()

const { user, loadingUser } = storeToRefs(userStore)
const router = useRouter()
const searchUsername = ref('')
const onSearch = () => {
     if (searchUsername.value.trim()) {
        router.push(`/profile/${searchUsername.value.trim()}`)
        searchUsername.value = ''
     }
}

const handleLogout = async () => {
    await userStore.handleLogout()
}

const goToUsersProfile = () => {
    router.push(`/profile/${user.value.username}`)
}

</script>
<template>
    <a-layout-header class="header">
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
      <Container>
        <div class="nav-container">
            <div class="left-content">
                <a-menu-item key="1" class="menu-item">
                <RouterLink to="/">Instagram</RouterLink> 
            </a-menu-item>
          
                <a-input-search
                v-model:value="searchUsername"
                placeholder="username..."
                style="width: 200px"
                @search="onSearch"
                />
            </div>
            <div class="content" v-if="!loadingUser">
                <div class="right-content" v-if="!user">
        <AuthModal :isLogIn="false"/>
        <AuthModal :isLogIn="true"/>
       </div>
       <div class="right-content" v-else>
        <a-button type="primary" @click="goToUsersProfile">Profile</a-button>
        <a-button type="primary" @click="handleLogout">Log Out</a-button>
       </div>
    </div>
      
   
    </div>
      </Container>
      
      </a-menu>
      
    </a-layout-header>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
}

.left-content {
    display: flex;
    align-items: center;
}

.left-content .menu-item {
    margin-right: 10px;
}


.right-content {
    display:flex;
    align-items: center;
   
}

.right-content button {
    margin-left: 10px;
}

.content {
    display: flex;
    align-items: center;
}
</style>