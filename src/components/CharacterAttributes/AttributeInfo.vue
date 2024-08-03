<script setup>
import attributesData from '../../constants/ATTRIBUTES_DATA.json';
import { attributeStatsSelector, attributeCountSelector } from '../../store/attributeStore.js';
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { equipmentStats } from '../../store/equipmentStore.js';

const { attributeName } = defineProps({
    attributeName: String
});
const attributeCount = attributeCountSelector(attributeName);
const attributeStats = attributeStatsSelector(attributeName);
</script>
<template>
    <div class="info">
        <p class="info__name">{{ attributeCount }} {{ storeKeyToTitle(attributeName) }}</p>
        <p class="info__description">{{ attributesData[attributeName].title }}</p>
        <ul class="info__bonuses">
            <li
                v-for="(bonusText, bonusCount) in attributesData[attributeName].bonusList"
                :key="bonusCount"
                class="info__bonusesItem"
                :class="{ active: attributeCount >= Number(bonusCount) }">
                {{ bonusText }}
            </li>
        </ul>
        <div class="info__statsSources">
            <div class="info__statSourcesItem">
                <span>Base</span><span>{{ attributeCount }}</span>
            </div>
            <div v-if="equipmentStats[attributeName] > 0" class="info__statSourcesItem">
                <span>Equipment</span><span>{{ equipmentStats[attributeName] }}</span>
            </div>
        </div>
        <ul class="info__stats">
            <li v-for="(value, key) in attributeStats" :key="key" class="info__statsItem">
                <span>{{ storeKeyToTitle(key) }}</span
                ><span>{{ value }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.info {
    background-color: var(--neutral6);
    padding: var(--base-padding);
    min-width: 350px;
    text-align: left;
    font-size: 14px;
    color: var(--neutral4);
    border: 1px solid var(--neutral5);
    box-shadow: 0 0 20px var(--neutral7);
}

.info > * + * {
    margin-top: 0.625rem;
}

.active {
    color: var(--secondary-muted);
}

.info__name {
    color: white;
}

.info__stats {
    color: white;
}

.info__statsItem {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.info__bonusesItem {
    position: relative;
}

.info__bonusesItem.active::before {
    content: '';
    position: absolute;
    right: calc(100% + var(--base-padding) / 2);
    top: 50%;
    transform: translateY(-50%);
    border-radius: 100%;
    width: 0.625rem;
    height: 0.625rem;
    background-color: var(--secondary);
}

.info__statsSources {
    color: var(--primary-muted);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.3125rem;
}

.info__statSourcesItem {
    flex-basis: 50%;
    flex-shrink: 1;
    display: inline-flex;
    justify-content: space-between;
    background-color: var(--neutral5);
    padding-left: var(--base-padding);
    padding-right: var(--base-padding);
    border-radius: var(--base-border-radius);
}
</style>
