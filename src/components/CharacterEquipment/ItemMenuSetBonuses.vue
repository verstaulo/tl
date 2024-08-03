<script setup>
import storeKeyToTitle from '../../utils/storeKeyToTitle.js';
import { equipmentSetCounter } from '../../store/equipmentStore.js';
import SET_BONUSES from '../../constants/SET_BONUSES.json';

const props = defineProps({
    itemSetName: String,
    itemSetTitle: String
});

let [twoItemsTitle, twoItemsValue] = Object.entries(SET_BONUSES[props.itemSetName][2])[0];
let fourItemsTitle;
let fourItemsValue;
if (SET_BONUSES[props.itemSetName][4]) {
    [fourItemsTitle, fourItemsValue] = Object.entries(SET_BONUSES[props.itemSetName][4])[0];
}
</script>
<template>
    <div>
        <p>
            <b>{{ itemSetTitle }}</b>
        </p>
        <ul>
            <li :class="{ active: equipmentSetCounter[itemSetName] >= 2 }">
                <b>(2): </b>
                {{ storeKeyToTitle(twoItemsTitle) }}:
                {{ twoItemsValue }}
            </li>
            <li v-if="fourItemsTitle" :class="{ active: equipmentSetCounter[itemSetName] >= 4 }">
                <b>(4): </b>
                {{ storeKeyToTitle(fourItemsTitle) }}:
                {{ fourItemsValue }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.active {
    color: var(--secondary-muted);
}
</style>
