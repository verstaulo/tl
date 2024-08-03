<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import ItemMenuStats from './ItemMenuStats.vue';
import ItemMenuPerk from './ItemMenuPerk.vue';
import ItemMenuTraits from './ItemMenuTraits.vue';
import ItemMenuSetBonuses from './ItemMenuSetBonuses.vue';
import { equipment } from '../../store/equipmentStore.js';
import ENCHANT_PATTERNS from '../../constants/ENCHANT_PATTERNS.json';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

const { equipmentItemStateKey, mode, item } = defineProps({
    mode: String,
    item: Object,
    equipmentItemStateKey: String
});
const emit = defineEmits(['closeMenu']);
const menuRef = ref();
const currentItem = item ? item : equipment.value[equipmentItemStateKey];

const _clickHandler = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        emit('closeMenu');
    }
};
onMounted(() => {
    if (mode === 'edit') {
        document.body.addEventListener('click', _clickHandler);
    }
});
onUnmounted(() => {
    if (mode === 'edit') {
        document.body.removeEventListener('click', _clickHandler);
    }
});
const titleStyles = computed(() => ({
    color: `var(--${currentItem.tier})`
}));

const enchantedLevel = ref(currentItem.level);
const enchantedStats = ref([]);
const selectedTraits = ref([]);

const increaseStatsHandler = () => {
    if (enchantedLevel.value >= 9) return;
    enchantedLevel.value++;
    const result = {};
    if (enchantedStats.value.length === 0) {
        Object.entries(currentItem.stats).forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number(((result[statKey] || 0) + statValue + bonusValue).toFixed(2));
            }
        });
    } else {
        enchantedStats.value.forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number(((result[statKey] || 0) + statValue + bonusValue).toFixed(2));
            }
        });
    }
    enchantedStats.value = Object.entries(result);
};
const decreaseStatsHandler = () => {
    if (enchantedLevel.value === 0) return;
    const result = {};
    if (enchantedStats.value.length === 0 && currentItem.level > 0) {
        Object.entries(currentItem.stats).forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number((statValue - bonusValue).toFixed(2));
            }
        });
    } else {
        enchantedStats.value.forEach(([statKey, statValue]) => {
            const bonusValue = ENCHANT_PATTERNS[currentItem.type][statKey]
                ? ENCHANT_PATTERNS[currentItem.type][statKey][enchantedLevel.value - 1]
                : 0;
            if (statKey === 'attack_speed') {
                result[statKey] = statValue;
            } else {
                result[statKey] = Number((statValue - bonusValue).toFixed(2));
            }
        });
    }
    enchantedLevel.value--;
    enchantedStats.value = Object.entries(result);
};
const submitEnchantedStatsHandler = () => {
    if (enchantedStats.value.length > 0) {
        equipment.value[equipmentItemStateKey].stats = Object.fromEntries(enchantedStats.value);
        equipment.value[equipmentItemStateKey].level = enchantedLevel.value;
    }
    if (selectedTraits.value.length > 0) {
        equipment.value[equipmentItemStateKey].selectedTraits = Object.fromEntries(selectedTraits.value);
        selectedTraits.value = [];
    }
    enchantedStats.value = [];
    enchantedLevel.value = currentItem.level;
};
</script>
<template>
    <div class="itemMenu" ref="menuRef" @click.stop>
        <div>
            <h3 :style="titleStyles" class="itemMenu__title">
                {{ currentItem.title }}
            </h3>
            <p :style="titleStyles" class="itemMenu__tier">Tier : {{ currentItem.tier }}</p>
            <p class="itemMenu__type">
                {{ storeKeyToTitle(currentItem.type) }}
            </p>
        </div>
        <template v-if="mode === 'edit'">
            <div class="itemMenu__controls">
                <div class="itemMenu__controls-level">
                    <button
                        class="itemMenu__buttonMinus"
                        :class="{ 'itemMenu__buttonMinus-active': currentItem.level > 0 || enchantedLevel > 0 }"
                        @click="decreaseStatsHandler">
                        <FontAwesomeIcon :icon="faMinusCircle" />
                    </button>
                    <span class="itemMenu__level">{{ enchantedLevel }}</span>
                    <button
                        class="itemMenu__buttonPlus"
                        :class="{
                            'itemMenu__buttonPlus-active': enchantedLevel < 9
                        }"
                        @click="increaseStatsHandler">
                        <FontAwesomeIcon :icon="faPlusCircle" />
                    </button>
                </div>

                <button
                    :disabled="enchantedLevel === currentItem.level && selectedTraits.length === 0"
                    class="itemMenu__buttonConfirm"
                    @click="submitEnchantedStatsHandler">
                    <FontAwesomeIcon :icon="faCheck" />
                </button>
            </div>
        </template>

        <ItemMenuStats
            :enchanted-stats="Object.fromEntries(enchantedStats)"
            :item-group="currentItem.itemGroup"
            :item-level="currentItem.level"
            :item-stats="currentItem.stats"
            :item-type="currentItem.type"
            :mode="mode" />
        <ItemMenuPerk
            v-if="currentItem.perk"
            :description="currentItem.perk.description"
            :image="currentItem.perk.image"
            :title="currentItem.perk.title" />
        <ItemMenuTraits
            :item-selected-traits="currentItem.selectedTraits ? Object.entries(currentItem.selectedTraits) : null"
            :item-available-traits="Object.entries(currentItem.traits)"
            :mode="mode"
            @trait-selected="
                (args) => {
                    selectedTraits = args;
                }
            " />
        <ItemMenuSetBonuses
            v-if="currentItem.setInfo"
            :item-set-name="currentItem.setInfo.setName"
            :item-set-title="currentItem.setInfo.setTitle" />
    </div>
</template>

<style scoped>
.itemMenu {
    display: grid;
    gap: 1rem;
    background-color: var(--neutral6);
    padding: var(--base-padding);
    min-width: 350px;
    text-align: left;
    font-size: 14px;
    color: var(--neutral4);
    border: 1px solid var(--neutral5);
    border-radius: 0.2rem;
    box-shadow: 0 0 20px var(--neutral7);
    user-select: none;
}

.itemMenu__level {
    min-width: 2rem;
    text-align: center;
}

.itemMenu__controls {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.itemMenu__controls > button {
    flex-grow: 1;
}

.itemMenu__controls-level {
    display: flex;
}

.itemMenu__buttonPlus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    padding: 2px;
    border-radius: 100%;
    background-color: var(--neutral7);
    color: var(--neutral6);
}

.itemMenu__buttonMinus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    padding: 2px;
    border-radius: 100%;
    background-color: var(--neutral7);
    color: var(--neutral6);
}

.itemMenu__buttonMinus-active {
    background-color: var(--primary-muted);
}

.itemMenu__buttonPlus-active {
    background-color: var(--secondary-muted);
}

.itemMenu__buttonConfirm {
    padding: 2px;
    border-radius: 0.25rem;
    background-color: var(--secondary-muted);
}

.itemMenu__buttonConfirm:disabled {
    background-color: var(--neutral5);
}
</style>
