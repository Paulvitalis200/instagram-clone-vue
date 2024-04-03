
<script setup>
import Container from '@/components/Container.vue';
import UserBar from '../components/UserBar.vue'
import ImageGallery from './ImageGallery.vue';
import { ref, onMounted, watch, reactive } from "vue"
import { useRoute } from "vue-router"
import {supabase} from '../supabase'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const route = useRoute()
const userStore = useUserStore()
const {user: loggedInUser} = storeToRefs(userStore)
const user = ref(null)
const {username} = route.params
const posts = ref([])
const loading = ref(false)
const isFollowing = ref(false)
const userInfo = reactive({
            posts: null,
            following: null,
            followers: null
        })

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const updateIsFollowing = (follow) => {
    isFollowing.value = follow
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

 await fetchIsFollowing()

 const followerCount = await fetchFollowersCount()
 const followingCount = await fetchFollowingCount()

 userInfo.followers = followerCount
 userInfo.following = followingCount
 userInfo.posts = posts.value.length
 loading.value = false
}

watch(loggedInUser, () => {
    fetchIsFollowing()
})
onMounted(() => {
    fetchData()
})

const fetchFollowersCount = async () => {
    const {count}= await supabase
    .from("followers_following")
    .select('*', { count: 'exact'})
    .eq("following_id", user.value.id)

    return count
}

const fetchFollowingCount = async () => {
    const {count}= await supabase
    .from("followers_following")
    .select('*', { count: 'exact'})
    .eq("follower_id", user.value.id)

    return count
}

const fetchIsFollowing = async() => {
    if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
        const response = await supabase
    .from("followers_following")
    .select()
    .eq("follower_id", loggedInUser.value.id)
    .eq("following_id", user.value.id)
    .single()

    if (response.data) isFollowing.value = true
    }
    
}
</script>
<template>
<Container>
    <div class="profile-container" v-if="!loading">
        <UserBar :user="user"  :key="$route.params.username" :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"/>
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