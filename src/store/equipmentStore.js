import { computed, ref } from 'vue';
import { enchantEquipmentStats } from '../utils/enchantStats';
import SET_BONUSES from '../constants/SET_BONUSES';
import filteredSecondaryStats from '../utils/filterSecondaryWeaponStats';
import mergeObjects from '../utils/mergeObjects';

export const equipment = ref({
    main_weapon: null,
    secondary_weapon: null,
    body: null,
    head: null,
    legs: null,
    boots: null,
    gloves: null,
    cloak: null,
    necklace: null,
    belt: null,
    bracelet: null,
    ring_first: null,
    ring_second: null
});
export const equipmentSetCounter = ref({
    chief_commander_set: 0,
    death_set: 0,
    ghost_wolf_set: 0,
    imperator_set: 0,
    mother_nature_set: 0,
    transcended_one_set: 0,
    dimensional_chaos_set: 0
});
const equipmentSetStats = computed(() => {
    const result = {};
    Object.entries(equipmentSetCounter.value).forEach(([key, value]) => {
        if (value >= 2) {
            let [bonusKey] = Object.keys(SET_BONUSES[key][2]);
            result[bonusKey] = (result[bonusKey] || 0) + SET_BONUSES[key][2][bonusKey];
        }
        if (value >= 4) {
            let [bonusKey] = Object.keys(SET_BONUSES[key][4]);
            result[bonusKey] = (result[bonusKey] || 0) + SET_BONUSES[key][4][bonusKey];
        }
    });
    console.log(result);
    return result;
});

export const putOnEquipment = (item, equipmentStateKey) => {
    if (equipment.value[equipmentStateKey]) {
        takeOffEquipment(equipmentStateKey);
    }
    equipment.value[equipmentStateKey] = item;
    if (item.setInfo?.setName) {
        equipmentSetCounter.value[item.setInfo.setName] += 1;
    }
    console.log('COUNTER', equipmentSetCounter.value);
};

export const takeOffEquipment = (equipmentStateKey) => {
    if (equipment.value[equipmentStateKey].setInfo.setName) {
        equipmentSetCounter.value[equipment.value[equipmentStateKey].setInfo.setName] -= 1;
    }
    console.log('COUNTER', equipmentSetCounter.value);
    equipment.value[equipmentStateKey] = null;
};

export const equipmentStats = computed(() =>
    mergeObjects([
        mergeObjects([equipment.value.main_weapon?.stats, equipment.value.main_weapon?.selectedTraits]),
        mergeObjects([
            filteredSecondaryStats(equipment.value.secondary_weapon?.stats),
            equipment.value.secondary_weapon?.selectedTraits
        ]),
        mergeObjects([equipment.value.head?.stats, equipment.value.head?.selectedTraits]),
        mergeObjects([equipment.value.legs?.stats, equipment.value.legs?.selectedTraits]),
        mergeObjects([equipment.value.body?.stats, equipment.value.body?.selectedTraits]),
        mergeObjects([equipment.value.boots?.stats, equipment.value.boots?.selectedTraits]),
        mergeObjects([equipment.value.gloves?.stats, equipment.value.gloves?.selectedTraits]),
        mergeObjects([equipment.value.cloak?.stats, equipment.value.cloak?.selectedTraits]),
        mergeObjects([equipment.value.necklace?.stats, equipment.value.necklace?.selectedTraits]),
        mergeObjects([equipment.value.belt?.stats, equipment.value.belt?.selectedTraits]),
        mergeObjects([equipment.value.bracelet?.stats, equipment.value.bracelet?.selectedTraits]),
        mergeObjects([equipment.value.ring_first?.stats, equipment.value.ring_first?.selectedTraits]),
        mergeObjects([equipment.value.ring_second?.stats, equipment.value.ring_second?.selectedTraits]),
        equipmentSetStats.value
    ])
);

// export const enchantEquipment = (equipmentStateKey) => {
//     if (equipment[equipmentStateKey].level === 9) return;
//     equipment.value[equipmentStateKey].stats = mergeObjects([
//         enchantEquipmentStats(
//             equipment.value[equipmentStateKey].stats,
//             equipment.value[equipmentStateKey].type,
//             equipment.value[equipmentStateKey].level
//         ),
//         equipment.value[equipmentStateKey].stats
//     ]);
//     equipment.value[equipmentStateKey].level += 1;
// };

// export const equipmentItemSelector = (stateKey) => computed(() => equipment.value[stateKey]);

// export const mainWeaponSelector = derived(
//   equipment,
//   ($equipment) => $equipment.main_weapon?.type
// );

// export const equipmentStatSelector = (/** @type {string} */ statName) =>
//   derived(
//     allEquipmentStats,
//     ($allEquipmentStats) => $allEquipmentStats[statName] || 0
//   );
