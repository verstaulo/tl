<script setup>
import CharacterAttributeCounter from './CharacterAttributesCounter.vue';
import {
    availableAttributesPoints,
    resetLocalAttributes,
    addAttribute,
    removeAttribute
} from '../../store/attributeStore';
import {
    totalStrengthCount,
    totalDexterityCount,
    totalWisdomCount,
    totalPerceptionCount,
    localStrengthCount,
    localDexterityCount,
    localWisdomCount,
    localPerceptionCount
} from '../../store/attributeStore';
import str_img from '../../assets/images/attributesLogos/str_img.webp';
import dex_img from '../../assets/images/attributesLogos/dex_img.webp';
import wis_img from '../../assets/images/attributesLogos/wis_img.webp';
import perc_img from '../../assets/images/attributesLogos/perc_img.webp';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons/faRotate';
</script>

<template>
    <section class="characterAttributes">
        <div class="characterAttributes__title">
            <span>Available Stat Points: {{ availableAttributesPoints }}</span>

            <button v-show="availableAttributesPoints < 49" @click="resetLocalAttributes">
                <FontAwesomeIcon :icon="faRotate" />
            </button>
        </div>
        <CharacterAttributeCounter
            attributeName="strength"
            :attributeImage="str_img"
            :attributeCount="totalStrengthCount"
            :localAttributeCount="localStrengthCount"
            @increase="addAttribute('strength')"
            @decrease="removeAttribute('strength')" />
        <CharacterAttributeCounter
            attributeName="dexterity"
            :attributeImage="wis_img"
            :attributeCount="totalDexterityCount"
            :localAttributeCount="localDexterityCount"
            @increase="addAttribute('dexterity')"
            @decrease="removeAttribute('dexterity')" />
        <CharacterAttributeCounter
            attributeName="wisdom"
            :attributeImage="dex_img"
            :attributeCount="totalWisdomCount"
            :localAttributeCount="localWisdomCount"
            @increase="addAttribute('wisdom')"
            @decrease="removeAttribute('wisdom')" />
        <CharacterAttributeCounter
            attributeName="perception"
            :attributeImage="perc_img"
            :attributeCount="totalPerceptionCount"
            :localAttributeCount="localPerceptionCount"
            @increase="addAttribute('perception')"
            @decrease="removeAttribute('perception')" />
    </section>
</template>

<style scoped>
.characterAttributes {
    user-select: none;
    border-radius: var(--base-border-radius);
    width: 100%;
    min-width: 25rem;
}

.characterAttributes__title {
    padding: var(--base-padding);
    margin: 0;
    text-align: center;
    position: relative;
}

.characterAttributes__title button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: red;
}
</style>
