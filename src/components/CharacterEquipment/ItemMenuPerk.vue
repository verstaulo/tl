<script setup>
defineProps({
  image: String,
  title: String,
  description: String
})
</script>
<template>
  <div class="perk">
    <img :src="image" alt="perkImage" class="perk__image"/>
    <div>
      <p>{{ title }}</p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
<style scoped>
.perk {
  display: flex;
  padding: 0.5rem;
  border-radius: 0.2rem;
  gap: 0.5rem;
  align-items: center;
  background-color: hsla(var(--neutral77), 0.95);
}

.perk__image {
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  border-radius: 100%;
}
</style>
