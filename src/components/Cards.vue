<template>
      <div class="timeline-container">
            <Card v-for="post in data" :key="post.id" :post="post"/>
        </div>
</template>
<script setup>
import Card from './Card.vue';
import { supabase } from '../supabase'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const data = [
    {
        id: 1,
        username: 'Pablo',
        url: 'https://www.brides.com/thmb/sAyc2txVvmJXbZFoqZZPm3Vf5_Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/01selenagomez-f35b65bd620b43c4b038a19832967121.jpg',
        caption: "I like pink"
    },
    {
        id: 2,
        username: 'The Weekend',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPK759DQ5AtAP_iov8YE1X6rPlEeHenfGQe3cr-YdyQ&s',
        caption: "Hello guys"
    }
]

const fetchData = async () => {
    const {data: followings} = await supabase
    .from("followers_following")
    .select("following_id")
    .eq("follower_id", user.value.id)

    const owner_ids = followings.map(f => f.following_id)
    const res = await supabase
    .from("posts")
    .select()
    .in("owner_id", owner_ids)
    console.log("RESPONSE: ", {res})
}

onMounted(() => {
    fetchData()
})
</script>
<style scoped>
.timeline-container {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>