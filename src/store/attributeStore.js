import { computed, ref } from 'vue';
import mergeObjects from '../utils/mergeObjects';
import ATTR_DAMAGE_PATTERN from '../constants/ATTRIBUTE_DAMAGE_PATTERN.json';
import HPMP_PATTERN from '../constants/HP_MP_REGEN_PATTERN.json';
import { equipment, equipmentStats } from './equipmentStore.js';

const main_weapon = computed(() => {
    return equipment.value.main_weapon?.type;
});

export const availableAttributesPoints = ref(49);

export const localStrengthCount = ref(10); // computed
export const totalStrengthCount = computed(() => {
    return localStrengthCount.value + (equipmentStats.value?.strength || 0);
});
export const strengthStats = computed(() => {
    const result = {
        main_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].strength[totalStrengthCount.value - 10]
            : 0,
        main_min_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].strength[totalStrengthCount.value - 10]
            : 0,
        off_hand_min_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].strength[totalStrengthCount.value - 10]
            : 0,
        off_hand_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].strength[totalStrengthCount.value - 10]
            : 0,
        melee_defense: (totalStrengthCount.value - 10) * 5,
        ranged_defense: (totalStrengthCount.value - 10) * 5,
        max_health: (totalStrengthCount.value - 10) * 45,
        health_regen: 15 + HPMP_PATTERN[totalStrengthCount.value - 10]
    };

    if (totalStrengthCount.value >= 30) {
        result.max_health += 750;
    }
    if (totalStrengthCount.value >= 40) {
        result.damage_reduction = 15;
    }
    if (totalStrengthCount.value >= 50) {
        result.melee_heavy_attack_chance = 100;
        result.ranged_heavy_attack_chance = 100;
        result.magic_heavy_attack_chance = 100;
    }
    if (totalStrengthCount.value >= 60) {
        result.max_health += 950;
    }
    return result;
});

export const localDexterityCount = ref(10); // computed
export const totalDexterityCount = computed(() => {
    return localDexterityCount.value + (equipmentStats.value?.dexterity || 0);
});
export const dexterityStats = computed(() => {
    const result = {
        main_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].dexterity[totalDexterityCount.value - 10] + 1
            : 0,
        off_hand_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].dexterity[totalDexterityCount.value - 10] + 1
            : 0,
        attack_speed: Number(((totalDexterityCount.value - 10) * -0.002).toFixed(3)),
        melee_evasion: (totalDexterityCount.value - 10) * 2,
        ranged_evasion: (totalDexterityCount.value - 10) * 2,
        magic_evasion: (totalDexterityCount.value - 10) * 2,
        melee_critical_hit: (totalDexterityCount.value - 10) * 5,
        ranged_critical_hit: (totalDexterityCount.value - 10) * 5,
        magic_critical_hit: (totalDexterityCount.value - 10) * 5
    };
    if (totalDexterityCount.value >= 30) {
        result.melee_critical_hit += 100;
        result.ranged_critical_hit += 100;
        result.magic_critical_hit += 100;
    }
    if (totalDexterityCount.value >= 40) {
        result.damage_bonus = 15;
    }
    if (totalDexterityCount.value >= 50) {
        result.move_speed_bonus = 5;
    }
    if (totalDexterityCount.value >= 60) {
        result.melee_critical_hit += 120;
        result.ranged_critical_hit += 120;
        result.magic_critical_hit += 120;
    }
    return result;
});

export const localWisdomCount = ref(10); // computed
export const totalWisdomCount = computed(() => {
    return localWisdomCount.value + (equipmentStats.value?.wisdom || 0);
});
export const wisdomStats = computed(() => {
    const result = {
        main_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].wisdom[totalWisdomCount.value - 10] + 1
            : 0,
        off_hand_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].wisdom[totalWisdomCount.value - 10] + 1
            : 0,
        max_mana: (totalWisdomCount.value - 10) * 45,
        // Need Check default MP regen
        mana_regen: Number((290 + HPMP_PATTERN[totalWisdomCount.value - 10]).toFixed(3)),
        cooldown_speed: Number(((totalWisdomCount.value - 10) * 0.25).toFixed(2))
    };
    if (totalWisdomCount.value >= 30) {
        result.max_mana += 750;
    }
    if (totalWisdomCount.value >= 40) {
        result.debuff_duration = 5;
    }
    if (totalWisdomCount.value >= 50) {
        result.cooldown_speed += 5;
    }
    if (totalWisdomCount.value >= 60) {
        result.max_mana += 900;
    }
    return result;
});

export const localPerceptionCount = ref(10); // computed
export const totalPerceptionCount = computed(() => {
    return localPerceptionCount.value + (equipmentStats.value?.perception || 0);
});
export const perceptionStats = computed(() => {
    const result = {
        main_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].perception[totalPerceptionCount.value - 10]
            : 0,
        main_min_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].perception[totalPerceptionCount.value - 10]
            : 0,
        off_hand_min_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].perception[totalPerceptionCount.value - 10]
            : 0,
        off_hand_max_damage: main_weapon.value
            ? ATTR_DAMAGE_PATTERN[main_weapon.value].perception[totalPerceptionCount.value - 10]
            : 0,
        melee_hit: (totalPerceptionCount.value - 10) * 5,
        ranged_hit: (totalPerceptionCount.value - 10) * 5,
        magic_hit: (totalPerceptionCount.value - 10) * 5,
        weaken_chance: (totalPerceptionCount.value - 10) * 5,
        enfeeble_chance: (totalPerceptionCount.value - 10) * 5,
        stun_chance: (totalPerceptionCount.value - 10) * 5,
        petrification_chance: (totalPerceptionCount.value - 10) * 5,
        silence_chance: (totalPerceptionCount.value - 10) * 5,
        sleep_chance: (totalPerceptionCount.value - 10) * 5,
        bind_chance: (totalPerceptionCount.value - 10) * 5,
        terror_chance: (totalPerceptionCount.value - 10) * 5,
        collision_chance: (totalPerceptionCount.value - 10) * 5,
        buff_duration: Number(((totalPerceptionCount.value - 10) * 0.5).toFixed(2))
    };
    if (totalPerceptionCount.value >= 30) {
        result.melee_hit += 100;
        result.ranged_hit += 100;
        result.magic_hit += 100;
    }
    if (totalPerceptionCount.value >= 40) {
        result.buff_duration += 5;
    }
    if (totalPerceptionCount.value >= 50) {
        result.bonus_range = 7.5;
    }
    if (totalPerceptionCount.value >= 60) {
        result.melee_hit += 120;
        result.ranged_hit += 120;
        result.magic_hit += 120;
    }
    return result;
});

export const attributesStats = computed(() =>
    mergeObjects([strengthStats.value, dexterityStats.value, wisdomStats.value, perceptionStats.value])
);

export function addAttribute(attributeName, count = 1) {
    switch (attributeName) {
        case 'strength':
            {
                const SP =
                    localStrengthCount.value < 30
                        ? 1
                        : localStrengthCount.value >= 30 && localStrengthCount.value < 40
                          ? 2
                          : localStrengthCount.value >= 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value - SP < 0) return;

                localStrengthCount.value += count;
                availableAttributesPoints.value -= SP;
            }
            break;
        case 'dexterity':
            {
                const SP =
                    localDexterityCount.value < 30
                        ? 1
                        : localDexterityCount.value >= 30 && localDexterityCount.value < 40
                          ? 2
                          : localDexterityCount.value >= 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value - SP < 0) return;

                localDexterityCount.value += count;
                availableAttributesPoints.value -= SP;
            }
            break;
        case 'wisdom':
            {
                const SP =
                    localWisdomCount.value < 30
                        ? 1
                        : localWisdomCount.value >= 30 && localWisdomCount.value < 40
                          ? 2
                          : localWisdomCount.value >= 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value - SP < 0) return;

                localWisdomCount.value += count;
                availableAttributesPoints.value -= SP;
            }
            break;
        case 'perception':
            {
                const SP =
                    localPerceptionCount.value < 30
                        ? 1
                        : localPerceptionCount.value >= 30 && localPerceptionCount.value < 40
                          ? 2
                          : localPerceptionCount.value >= 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value - SP < 0) return;

                localPerceptionCount.value += count;
                availableAttributesPoints.value -= SP;
            }
            break;
    }
}

export function removeAttribute(attributeName, count = 1) {
    switch (attributeName) {
        case 'strength':
            {
                if (localStrengthCount.value === 10) return;
                const SP =
                    localStrengthCount.value <= 30
                        ? 1
                        : localStrengthCount.value >= 31 && localStrengthCount.value <= 40
                          ? 2
                          : localStrengthCount.value > 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value + SP > 49) return;

                localStrengthCount.value -= count;
                availableAttributesPoints.value += SP;
            }
            break;
        case 'dexterity':
            {
                if (localDexterityCount.value === 10) return;
                const SP =
                    localDexterityCount.value <= 30
                        ? 1
                        : localDexterityCount.value >= 31 && localDexterityCount.value <= 40
                          ? 2
                          : localDexterityCount.value > 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value + SP > 49) return;
                localDexterityCount.value -= count;
                availableAttributesPoints.value += SP;
            }
            break;
        case 'wisdom':
            {
                if (localWisdomCount.value === 10) return;
                const SP =
                    localWisdomCount.value <= 30
                        ? 1
                        : localWisdomCount.value >= 31 && localWisdomCount.value <= 40
                          ? 2
                          : localWisdomCount.value > 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value + SP > 49) return;
                localWisdomCount.value -= count;
                availableAttributesPoints.value += SP;
            }
            break;
        case 'perception':
            {
                if (localPerceptionCount.value === 10) return;
                const SP =
                    localPerceptionCount.value <= 30
                        ? 1
                        : localPerceptionCount.value >= 31 && localPerceptionCount.value <= 40
                          ? 2
                          : localPerceptionCount.value > 40
                            ? 4
                            : 0;
                if (availableAttributesPoints.value + SP > 49) return;
                localPerceptionCount.value -= count;
                availableAttributesPoints.value += SP;
            }
            break;
    }
}

export const resetLocalAttributes = () => {
    localStrengthCount.value = 10;
    localDexterityCount.value = 10;
    localWisdomCount.value = 10;
    localPerceptionCount.value = 10;
    availableAttributesPoints.value = 49;
};

export const attributeCountSelector = (attributeName) => {
    switch (attributeName) {
        case 'strength':
            return localStrengthCount;
        case 'dexterity':
            return localDexterityCount;
        case 'wisdom':
            return localWisdomCount;
        case 'perception':
            return localPerceptionCount;
    }
};

export function attributeStatsSelector(attributeName) {
    switch (attributeName) {
        case 'strength':
            return strengthStats;
        case 'dexterity':
            return dexterityStats;
        case 'wisdom':
            return wisdomStats;
        case 'perception':
            return perceptionStats;
    }
}
