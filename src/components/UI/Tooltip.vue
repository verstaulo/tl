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
        const rootNodeCoords = rootNode.value.getBoundingClientRect();
        const { width, height, top, right, bottom, left } = contentNode.value.getBoundingClientRect();
        const hasBottomFreeSpace = window.innerHeight - bottom > 0;
        const hasRightFreeSpace = window.innerWidth - right > 0;
        const hasTopFreeSpace = rootNodeCoords.top - height > 0;
        const hasLeftFreeSpace = rootNodeCoords.left - width > 0;
        const st = () => {
            if (!hasRightFreeSpace && hasBottomFreeSpace && hasLeftFreeSpace) {
                return {
                    top: '100%',
                    right: 'calc(100% + 1rem)',
                    bottom: 'unset',
                    left: 'unset'
                };
            } else if (hasRightFreeSpace && !hasBottomFreeSpace) {
                return {
                    bottom: '0px',
                    left: 'calc(100% + 1rem)',
                    top: 'unset',
                    right: 'unset'
                };
            } else if (!hasRightFreeSpace && !hasBottomFreeSpace) {
                return {
                    bottom: '0px',
                    right: 'calc(100% + 1rem)',
                    top: 'unset',
                    left: 'unset'
                };
            } else if (!hasRightFreeSpace && !hasLeftFreeSpace && hasBottomFreeSpace) {
                return {
                    position: 'fixed',
                    top: `${rootNodeCoords.bottom}px`,
                    bottom: 'unset',
                    right: 'unset',
                    left: '50%',
                    transform: 'translateX(-50%)'
                };
            } else
                return {
                    position: 'fixed',
                    top: `${rootNodeCoords.bottom}px`,
                    bottom: 'unset',
                    right: 'unset',
                    left: '50%',
                    transform: 'translateX(-50%)'
                };
        };
        return st();
    }
});

// else if (!topOffset && rightOffset) {
//   return {
//     top: 'unset',
//     bottom: '0px',
//     left: 'calc(100% + 1rem)',
//     right: 'unset'
//   };
// } else if (!topOffset && !rightOffset && !lef) {
//   return {
//     bottom: '0px',
//     top: '0px',
//     left: 'unset',
//     right: 'calc(100% + 1rem)'
//   };
// }
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
