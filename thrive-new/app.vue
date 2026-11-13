<script setup>
const route = useRoute()
useHead({
  title: 'Thrive Africa | Providing Global In-demand Digital Skills to Africans',
links: [
  {
      rel: 'canonical',
      href: 'https://thriveafrica.co' + route.path,
    },
],
script: []
})
useSeoMeta({
  title: 'Thrive Africa | Providing Global In-demand Digital Skills to Africans',
  ogTitle: 'Thrive Africa | Providing Global In-demand Digital Skills to Africans',
  ogDescription: 'Thrive Africa is a program that provides free digital skills training to African graduates. Graduates can choose from a list of in-demand skills courses and will be connected to potential jobs upon completion.',
  ogImage: 'https://thriveafrica.co/images/meta.png',
  ogUrl: 'https://thriveafrica.co',
  ogType: 'content',
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');


*, html {
  font-family: 'Outfit', sans-serif;
  scroll-behavior: smooth !important;
  
}

body {
  overflow-x: hidden;
}

/* hide number buttons */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>