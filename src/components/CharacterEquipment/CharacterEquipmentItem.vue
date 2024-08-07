<script setup>
import DEFAULT_ITEMS_DATA from '../../constants/DEFAULT_ITEMS_DATA.json';
import { equipment, takeOffEquipment } from '../../store/equipmentStore.js';
import { ref } from 'vue';
import Modal from '../UI/Modal.vue';
import EquipmentList from './EquipmentList.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleQuestion, faCircleXmark, faHammer } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../UI/Tooltip.vue';
import ItemMenu from './ItemMenu.vue';

const { equipmentItemStateKey } = defineProps({
    equipmentItemStateKey: String,
    isMenuOpen: Boolean
});
defineEmits(['updateMenuIsOpen']);

const isItemsListOpen = ref(false);
</script>

<template>
    <div class="equipmentItem">
        <button
            :class="{
                uncommon: equipment[equipmentItemStateKey]?.tier === 'uncommon',
                common: equipment[equipmentItemStateKey]?.tier === 'common',
                rare: equipment[equipmentItemStateKey]?.tier === 'rare',
                epic: equipment[equipmentItemStateKey]?.tier === 'epic',
                epic2: equipment[equipmentItemStateKey]?.tier === 'epic2',
                legendary: equipment[equipmentItemStateKey]?.tier === 'legendary',
                main: equipmentItemStateKey === 'main_weapon',
                shadow: equipmentItemStateKey === 'main_weapon' && equipment[equipmentItemStateKey],
                secondary: equipmentItemStateKey === 'secondary_weapon'
            }"
            class="equipmentItem__button"
            @click="isItemsListOpen = true">
            <img
                :src="
                    equipment[equipmentItemStateKey]
                        ? equipment[equipmentItemStateKey].image
                        : DEFAULT_ITEMS_DATA[equipmentItemStateKey].image
                "
                :alt="equipmentItemStateKey"
                draggable="false"
                class="equipmentItem__image" />
            <span v-if="equipment[equipmentItemStateKey]?.level > 0" class="equipmentItem__level">
                {{ equipment[equipmentItemStateKey]?.level }}
            </span>
        </button>

        <div v-if="equipment[equipmentItemStateKey]" class="equipmentItem__controls">
            <button
                v-show="equipment[equipmentItemStateKey]"
                class="equipmentItem__closeBtn"
                @click.stop="
                    () => {
                        takeOffEquipment(equipmentItemStateKey);
                    }
                ">
                <FontAwesomeIcon :icon="faCircleXmark" class="fa fa-close" />
            </button>
            <Tooltip>
                <template #tooltip__trigger="{ toggle }">
                    <button>
                        <FontAwesomeIcon
                            :icon="faCircleQuestion"
                            class="fa-info"
                            @mouseenter="toggle(isMenuOpen)"
                            @mouseleave="toggle(isMenuOpen)" />
                    </button>
                </template>
                <ItemMenu :equipment-item-state-key="equipmentItemStateKey" mode="info" />
            </Tooltip>
            <button @click.stop="$emit('updateMenuIsOpen', equipmentItemStateKey)">
                <FontAwesomeIcon :icon="faHammer" class="fa fa-enchant" />
            </button>
        </div>
    </div>
    <Modal v-model:is-open="isItemsListOpen">
        <EquipmentList :equipmentStateKey="equipmentItemStateKey" @selected="isItemsListOpen = false" />
    </Modal>
</template>

<style scoped>
.equipmentItem {
    position: relative;
    display: flex;
}

.equipmentItem__button {
    display: block;
    position: relative;
    border: 1px solid var(--neutral5);
    border-radius: 100%;
    background-color: var(--neutral6);
    width: 4.75rem;
    height: 4.75rem;
}

.equipmentItem__button.main {
    width: 8.75rem;
    height: 8.75rem;
}

.equipmentItem__level {
    position: absolute;
    z-index: 50;
    bottom: 0;
    left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    background-color: var(--epicBase);
    border: 1px solid var(--neutral4);
    border-radius: 100%;
    width: 20px;
    height: 20px;
    font-size: 15px;
    font-weight: bold;
}

.shadow {
    filter: drop-shadow(0 0 10px var(--epic));
}

.equipmentItem__button.secondary {
    filter: brightness(50%);
}

.equipmentItem__controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
}

.equipmentItem__controls button {
    padding: 0.2rem;
}

.equipmentItem__image {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.equipmentItem__closeBtn {
    visibility: hidden;
}

.equipmentItem:hover .equipmentItem__closeBtn {
    visibility: visible;
}

.epic {
    background: var(--epic-Rgradient);
}

.epic2 {
    background: var(--epic2-Rgradient);
}

.legendary {
    background: var(--legendary-Rgradient);
}

.rare {
    background: var(--rare-Rgradient);
}

.uncommon {
    background: var(--uncommon-Rgradient);
}
@media (max-width: 899px) {
    .equipmentItem__controls {
        padding: 0 0.25rem;
    }
}
</style>
