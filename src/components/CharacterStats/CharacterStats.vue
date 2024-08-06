<script setup>
import CHARACTER_STATS_GROUPS from '../../constants/CHARACTER_STATS_GROUPS.json';
import StatsGroup from './StatsGroup.vue';
</script>

<template>
    <ul class="characterStats">
        <li
            v-for="(groupStats, groupName) in CHARACTER_STATS_GROUPS"
            :class="groupName === 'survival' ? 'survivalGroup' : ''"
            class="characterStats__Group">
            <StatsGroup
                v-if="groupName !== 'others'"
                :key="groupName"
                :group-name="groupName"
                :group-stats="groupStats"></StatsGroup>
        </li>
    </ul>
</template>

<style scoped>
.characterStats {
    display: grid;
    grid-template-columns: 400px 400px;
    place-content: center;
    gap: 1rem;
}

.characterStats__Group {
    min-width: 300px;
    border-radius: var(--base-border-radius);
    background-color: var(--neutral6);
}

.survivalGroup {
    grid-column: span 2;
}

.survivalGroup :deep(.characterStats__Group_stats) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

@media (max-width: 1330px) {
    .characterStats {
        grid-template-columns: 1fr;
    }

    .survivalGroup :deep(.characterStats__Group_stats) {
        grid-template-columns: unset;
    }

    .survivalGroup {
        grid-column: unset;
    }
}
</style>
