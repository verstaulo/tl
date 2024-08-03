<script setup>
import ALL_EQUIPMENT from '../../constants/ALL_EQUIPMENT.json';
import EquipmentListFilters from './EquipmentListFilters.vue';
import { computed, ref } from 'vue';
import { putOnEquipment } from '../../store/equipmentStore.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../UI/Tooltip.vue';
import ItemMenu from './ItemMenu.vue';

const { equipmentStateKey } = defineProps({
    equipmentStateKey: String
});
const stateKeyMap = {
    main_weapon: 'weapon',
    secondary_weapon: 'weapon',
    body: 'body',
    head: 'head',
    legs: 'legs',
    boots: 'boots',
    gloves: 'gloves',
    cloak: 'cloak',
    necklace: 'necklace',
    belt: 'belt',
    bracelet: 'bracelet',
    ring_first: 'ring',
    ring_second: 'ring'
};
const equipmentType = stateKeyMap[equipmentStateKey];
let armorTypes = ['body', 'head', 'legs', 'boots', 'gloves'];

const tierFilters = ['epic', 'epic2'];
const armorFilters = ['heavy', 'light', 'cloth'];
const weaponFilters = ['dagger', 'crossbow', 'longbow', 'staff', 'greatsword', 'shield', 'wand'];

const activeTierFilter = ref('epic');
const activeArmorFilter = ref('heavy');
const activeWeaponFilter = ref('dagger');
const filteredItems = computed(() => {
    return ALL_EQUIPMENT[equipmentType].filter(
        (item) =>
            item.tier === activeTierFilter.value &&
            ((item.itemGroup === 'weapon' && item.type === activeWeaponFilter.value) ||
                (item.itemGroup === 'armor' && item.type.includes(activeArmorFilter.value)) ||
                item.type === 'cloak' ||
                item.itemGroup === 'accessory')
    );
});
</script>
<template>
    <div class="itemsList">
        <div class="itemsList__filters">
            <EquipmentListFilters v-model="activeTierFilter" :filters-list="tierFilters" />
            <EquipmentListFilters
                v-if="armorTypes.includes(equipmentType)"
                v-model="activeArmorFilter"
                :filters-list="armorFilters" />
            <EquipmentListFilters
                v-if="equipmentType === 'weapon'"
                v-model="activeWeaponFilter"
                :filters-list="weaponFilters" />
        </div>

        <ul class="itemsList__cards" @click.self.stop>
            <li v-for="item in filteredItems">
                <button
                    :class="{
                        uncommon: activeTierFilter === 'uncommon',
                        common: activeTierFilter === 'common',
                        rare: activeTierFilter === 'rare',
                        epic: activeTierFilter === 'epic',
                        epic2: activeTierFilter === 'epic2',
                        legendary: activeTierFilter === 'legendary'
                    }"
                    class="itemsList__cardItem"
                    @click="putOnEquipment(item, equipmentStateKey)">
                    <img :alt="item.title" :src="item.image" class="cardItem__image" />
                    <span>{{ item.title }}</span>
                    <Tooltip :style="{ marginLeft: 'auto' }">
                        <template #tooltip__trigger="{ toggle }">
                            <FontAwesomeIcon
                                :icon="faCircleQuestion"
                                :style="{ color: 'grey' }"
                                @mouseenter="toggle()"
                                @mouseleave="toggle()"></FontAwesomeIcon>
                        </template>
                        <ItemMenu :item="item" mode="info"></ItemMenu>
                    </Tooltip>
                </button>
            </li>
        </ul>

        <div v-if="filteredItems.length === 0">
            <p class="empty">There are no items available yet...</p>
        </div>
    </div>
</template>

<style scoped>
.itemsList {
    width: min-content;
    border-radius: var(--base-border-radius);
    background-color: var(--neutral6);
}

.itemsList__filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: var(--base-padding);
    margin-bottom: 1rem;
}

.itemsList__cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: var(--base-padding);
}

.itemsList__cardItem {
    display: flex;
    align-items: center;
    width: 21.875rem;
    border: none;
    cursor: pointer;
    border-radius: var(--base-border-radius);
    padding: var(--base-padding);
    transition: all 0.3s ease;
}

.itemsList__cardItem.epic {
    background: var(--epic_gradient);
}

.itemsList__cardItem.epic2 {
    background: var(--epic_gradient);
}

.itemsList__cardItem.legendary {
    background: var(--legendary_gradient);
}

.itemsList__cardItem.rare {
    background: var(--rare_gradient);
}

.itemsList__cardItem.uncommon {
    background: var(--uncommon_gradient);
}

.epic:hover > img {
    filter: drop-shadow(0px 0px 1rem var(--epic));
}

.epic2:hover > img {
    filter: drop-shadow(0px 0px 1rem var(--epic));
}

.legendary:hover > img {
    filter: drop-shadow(0px 0px 1rem var(--legendary));
}

.rare:hover > img {
    filter: drop-shadow(0px 0px 1rem var(--rare));
}

.uncommon:hover > img {
    filter: drop-shadow(0px 0px 1rem var(--uncommon));
}

.cardItem__image {
    transition: all 0.3s ease;
    width: 3.125rem;
    height: 3.125rem;
}

.empty {
    width: 21.875rem;
    height: 18.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral7);
}
</style>
