import { computed } from 'vue';
import { equipment, equipmentStats } from './equipmentStore.js';
import { attributesStats } from './attributeStore.js';
import mergeObjects from '../utils/mergeObjects';
import DEFAULT_CHARACTER_STATS from '../constants/DEFAULT_CHARACTER_STATS.json';
import CHARACTER_STATS_DAMAGE_NO_WEAPON from '../constants/CHARACTER_STATS_DAMAGE_NO_WEAPON.json';

export const statsStore = computed(() => {
    let result = {};
    if (equipment.value.main_weapon) {
        result = mergeObjects([DEFAULT_CHARACTER_STATS, attributesStats.value, equipmentStats.value]);
        result.attack_speed = Number(
            (result.attack_speed / (((result.attack_speed_bonus || 0) + 0) / 100 + 1)).toFixed(3)
        );
        if (result.bonus_range > 0) {
            result.attack_range = Number(
                (result.attack_range + (result.attack_range * result.bonus_range) / 100).toFixed(2)
            );
        }
        if (result.shield_block_chance_bonus > 0) {
            result.shield_block_chance += (result.shield_block_chance * result.shield_block_chance_bonus) / 100;
        }
        if (result.off_hand_weapon_attack_chance_bonus > 0) {
            result.off_hand_weapon_attack_chance +=
                (result.off_hand_weapon_attack_chance * result.off_hand_weapon_attack_chance_bonus) / 100;
        }

        if (result.move_speed_bonus > 0) {
            result.move_speed = Number((result.move_speed * (result.move_speed_bonus / 100 + 1)).toFixed(0));
        }
        return result;
    } else {
        result = mergeObjects([
            DEFAULT_CHARACTER_STATS,
            CHARACTER_STATS_DAMAGE_NO_WEAPON,
            attributesStats.value,
            equipmentStats.value
        ]);
        result.attack_speed = Number((result.attack_speed / ((result.attack_speed_bonus || 0) / 100 + 1)).toFixed(3));
        if (result.move_speed_bonus > 0) {
            result.move_speed = Number((result.move_speed * (result.move_speed_bonus / 100 + 1)).toFixed(0));
        }
    }
    return result;
});
