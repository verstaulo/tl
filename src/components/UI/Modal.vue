<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});
defineEmits(['update:isOpen']);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="modal" @click="$emit('update:isOpen', false)">
                <div class="modal__content" @click.stop>
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
}

.modal__content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
