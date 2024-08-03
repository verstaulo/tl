<script setup>
import CharacterEquipmentItem from './CharacterEquipmentItem.vue';
import { nextTick, ref } from 'vue';
import ItemMenu from './ItemMenu.vue';

const equipmentKeys = {
    armorKeys: ['head', 'body', 'legs', 'boots', 'gloves', 'cloak'],
    weaponKeys: ['secondary_weapon', 'main_weapon'],
    accessoryKeys: ['necklace', 'belt', 'bracelet', 'ring_first', 'ring_second']
};
let equipmentItemStateKey = ref(null);

const isMenuOpen = ref(false);

const toggleMenuOpenHandler = (itemStateKey) => {
    if (itemStateKey) {
        equipmentItemStateKey.value = itemStateKey;
        isMenuOpen.value = !isMenuOpen.value;
    } else {
        equipmentItemStateKey.value = null;
        isMenuOpen.value = !isMenuOpen.value;
    }
};
</script>

<template>
    <section class="characterEquipment">
        <div class="weapon">
            <CharacterEquipmentItem
                v-for="stateKey in equipmentKeys.weaponKeys"
                :equipment-item-state-key="stateKey"
                :is-menu-open="isMenuOpen"
                @updateMenuIsOpen="toggleMenuOpenHandler" />
        </div>
        <div class="armor">
            <CharacterEquipmentItem
                v-for="stateKey in equipmentKeys.armorKeys"
                :equipment-item-state-key="stateKey"
                :is-menu-open="isMenuOpen"
                @updateMenuIsOpen="toggleMenuOpenHandler" />
        </div>
        <div class="accessory">
            <CharacterEquipmentItem
                v-for="stateKey in equipmentKeys.accessoryKeys"
                :equipment-item-state-key="stateKey"
                :is-menu-open="isMenuOpen"
                @updateMenuIsOpen="toggleMenuOpenHandler" />
        </div>
        <div v-if="isMenuOpen" class="menu">
            <ItemMenu
                :equipment-item-state-key="equipmentItemStateKey"
                mode="edit"
                @close-menu="toggleMenuOpenHandler"></ItemMenu>
        </div>
    </section>
</template>

<style>
.characterEquipment {
    display: grid;
    gap: 1rem;
    padding: var(--base-padding);
}

.weapon {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.armor,
.accessory {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}

.menu {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: calc(100% + 1rem);
    top: 0;
    z-index: 99;
}
</style>
