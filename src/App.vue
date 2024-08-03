<script setup>
import CharacterAttributes from './components/CharacterAttributes/CharacterAttributes.vue';
import CharacterStats from './components/CharacterStats/CharacterStats.vue';
import CharacterEquipment from './components/CharacterEquipment/CharacterEquipment.vue';
</script>

<template>
    <main class="main">
        <div class="controls">
            <CharacterEquipment></CharacterEquipment>
            <div class="divider"></div>
            <CharacterAttributes></CharacterAttributes>
        </div>
        <div class="stats">
            <CharacterStats></CharacterStats>
        </div>
    </main>
</template>

<style scoped>
.main {
    min-height: 100vh;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.controls {
    padding: 1rem;
    position: relative;
}

.divider {
    height: 1px;
    margin: 1rem 0;
    border-radius: 100%;
    background-color: var(--neutral6);
}

.stats {
    flex-grow: 1;
    padding: 1rem;
    border-radius: 1rem;
    background-color: hsla(var(--neutral66), 0.3);
}
</style>
