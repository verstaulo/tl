<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';

const isOpen = ref(false);

const rootNode = ref(null);
const contentNode = ref(null);

const toggleOpenHandler = (flag) => {
    if (flag === true) {
    } else if (flag === false || flag === undefined) {
        isOpen.value = !isOpen.value;
    }
};

const style = computed(() => {
    if (contentNode.value) {
        const { bottom } = contentNode.value.getBoundingClientRect();
        const top = window.innerHeight - bottom > 0;
        if (top) {
            return {
                top: '0px',
                bottom: 'unset'
            };
        } else {
            return {
                bottom: '0px',
                top: 'unset'
            };
        }
    }
});
</script>

<template>
    <div class="tooltip" ref="rootNode">
        <slot :toggle="toggleOpenHandler" name="tooltip__trigger"></slot>
        <transition>
            <div v-if="isOpen" class="tooltip__content" ref="contentNode" :style="style">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style>
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip__content {
    position: absolute;
    top: 0;
    left: calc(100% + 1rem);
    z-index: 99;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
