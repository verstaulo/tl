<script setup>
import CounterProgress from './CounterProgress.vue';
import Tooltip from '../UI/Tooltip.vue';
import AttributeInfo from './AttributeInfo.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleQuestion, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';

const props = defineProps({
    attributeName: String,
    attributeImage: String,
    attributeCount: Number,
    localAttributeCount: Number
});
defineEmits(['increase', 'decrease']);
const fine = computed(() => {
    return props.localAttributeCount - 10 >= 20 && props.localAttributeCount - 10 < 30
        ? 2
        : props.localAttributeCount - 10 >= 30 && props.localAttributeCount - 10 < 40
          ? 4
          : 0;
});
</script>
<template>
    <div class="attributeCounter">
        <img :src="$props.attributeImage" alt="attributeName" class="attributeCounter__image" draggable="false" />
        <p class="attributeCounter__title">{{ $props.attributeName }}</p>
        <div class="attributeCounter__controls">
            <button class="attributeCounter__button" @click="$emit('decrease')">
                <FontAwesomeIcon :icon="faMinus" />
            </button>
            <CounterProgress :attributeCount="$props.attributeCount"></CounterProgress>
            <button class="attributeCounter__button attributeCounter__button-plus" @click="$emit('increase')">
                <FontAwesomeIcon :icon="faPlus" />
                <span class="fine" v-if="fine > 0">- {{ fine }}</span>
            </button>
        </div>
        <Tooltip style="align-self: flex-start">
            <template #tooltip__trigger="{ toggle }">
                <FontAwesomeIcon
                    :icon="faCircleQuestion"
                    class="fa-info"
                    @mouseenter="toggle()"
                    @mouseleave="toggle()" />
            </template>
            <AttributeInfo :attribute-name="attributeName"></AttributeInfo>
        </Tooltip>
    </div>
</template>

<style scoped>
.attributeCounter {
    padding: var(--base-padding);
    display: flex;
    align-items: center;
    background-color: var(--neutral7);
    position: relative;
}

.attributeCounter:last-child {
    border-bottom-left-radius: calc(var(--base-border-radius) - var(--base-padding));
    border-bottom-right-radius: calc(var(--base-border-radius) - var(--base-padding));
}

.attributeCounter__image {
    height: 100%;
    filter: brightness(300%) drop-shadow(0 0 10px var(--legendary));
}

.attributeCounter__title {
    flex-grow: 1;
    text-transform: capitalize;
}

.attributeCounter__controls {
    display: flex;
}

.attributeCounter__button {
    width: 22px;
    height: 22px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    padding: calc(var(--base-padding) / 2);
    background-color: var(--neutral6);
    align-self: flex-end;
    line-height: 0.5;
    cursor: pointer;
}

.fine {
    position: absolute;
    bottom: 100%;
    left: 100%;
    width: max-content;
    padding: 0.25rem;
    color: rgba(255, 0, 0, 0.5);
    font-weight: bold;
}

.attributeCounter__button:hover {
    background-color: var(--neutral5);
}

.attributeCounter__button:active {
    background-color: var(--neutral6);
}

.attributeCounter__button-plus {
    background-color: var(--primary-muted);
}

.attributeCounter__button-plus:hover {
    background-color: var(--primary);
}

.attributeCounter__button-plus:active {
    background-color: var(--primary-muted);
}
</style>
