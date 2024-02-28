<script setup>
import { RouterLink } from 'vue-router'
import Container from './Container.vue'
import AuthModal from './AuthModal.vue';
import {ref} from 'vue'

const searchUsername = ref('')

const onSearch = () => {
     
}

const isAuthenticated = ref(false)
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
       <div class="right-content" v-if="!isAuthenticated">
        <AuthModal :isLogIn="false"/>
        <AuthModal :isLogIn="true"/>
       </div>
       <div class="right-content" v-else>
        <a-button type="primary">Profile</a-button>
        <a-button type="primary">Log Out</a-button>
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
</style>