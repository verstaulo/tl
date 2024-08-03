<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { statsStore } from '../../store/statsStore.js';
import { equipment } from '../../store/equipmentStore.js';

defineProps({
    groupName: String,
    groupStats: Object
});
</script>

<template>
    <p class="characterStats__Group_title">{{ groupName }}</p>
    <ul class="characterStats__Group_stats">
        <template
            v-if="
                groupName === 'weapons' &&
                (equipment.main_weapon?.type === 'dagger' || equipment.main_weapon?.type === 'crossbow')
            ">
            <li class="characterStats__Group_item">
                <span>Base Damage | Main </span>
                <span>
                    {{ statsStore.main_min_damage }}
                    ~
                    {{ statsStore.main_max_damage }}
                </span>
            </li>
            <li class="characterStats__Group_item">
                <span>Attack Speed</span>
                {{ statsStore.attack_speed }}
            </li>
            <li class="characterStats__Group_item">
                <span>Range </span>
                {{ statsStore.attack_range }}
            </li>
            <li class="characterStats__Group_item">
                <span>Base Damage | Off-Hand Weapon </span>
                <span>
                    {{ statsStore.off_hand_min_damage }} ~
                    {{ statsStore.off_hand_max_damage }}
                </span>
            </li>
            <li class="characterStats__Group_item">
                <span>Off-Hand Weapon Attack Chance </span>
                {{ statsStore.off_hand_weapon_attack_chance }}
            </li>
        </template>

        <template v-else-if="groupName === 'weapons' && equipment.main_weapon?.type === 'shield'">
            <li class="characterStats__Group_item">
                <span>Base Damage | Main </span>
                <span>
                    {{ statsStore.main_min_damage }}
                    ~
                    {{ statsStore.main_max_damage }}
                </span>
            </li>
            <li class="characterStats__Group_item">
                <span>Attack Speed</span>
                {{ statsStore.attack_speed }}
            </li>
            <li class="characterStats__Group_item">
                <span>Range </span>
                {{ statsStore.attack_range }}
            </li>
            <li class="characterStats__Group_item">
                <span>Shield Block Chance </span>
                <span>
                    {{ statsStore.shield_block_chance }}
                </span>
            </li>
            <li class="characterStats__Group_item">
                <span>Damage Reduction </span>
                {{ statsStore.damage_reduction }}
            </li>
        </template>

        <template v-else-if="groupName === 'weapons'">
            <li class="characterStats__Group_item">
                <span>Base Damage | Main </span>
                <span>
                    {{ statsStore.main_min_damage }}
                    ~
                    {{ statsStore.main_max_damage }}
                </span>
            </li>
            <li class="characterStats__Group_item">
                <span>Attack Speed</span>
                {{ statsStore.attack_speed }}
            </li>
            <li class="characterStats__Group_item">
                <span>Range </span>
                {{ statsStore.attack_range }}
            </li>
        </template>

        <template v-else>
            <li v-for="(_, statName) in groupStats" :key="statName" class="characterStats__Group_item">
                <span>{{ storeKeyToTitle(statName) }}:</span><span>{{ statsStore[statName] || 0 }}</span>
            </li>
        </template>
    </ul>
</template>
<style scoped>
.characterStats__Group_title {
    text-transform: capitalize;
    text-align: center;
    user-select: none;
    padding: calc(var(--base-padding) / 2);
    background-color: var(--neutral7);
    mix-blend-mode: screen;
    border-top-left-radius: var(--base-border-radius);
    border-top-right-radius: var(--base-border-radius);
}

.characterStats__Group_stats {
    user-select: none;
    padding: 0 8px 4px;
}

.characterStats__Group_item {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
}
</style>
