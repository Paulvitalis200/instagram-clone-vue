<template>
      <div class="timeline-container">
            <Card v-for="post in data" :key="post.id" :post="post"/>
        </div>
</template>
<script setup>
import Card from './Card.vue';
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
</script>
<style scoped>
.timeline-container {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>