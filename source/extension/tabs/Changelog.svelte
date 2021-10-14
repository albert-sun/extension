<script lang="ts">
    import { changelogs } from "../../shared/constants";
</script>

<div class="flex-column column-spacing-large content">
    <!-- Display each changelog item separately -->
    {#each changelogs as changelog}
        <div class="flex-column column-spacing-tiny">
            <p class="header">{changelog.display}</p>
            {#each changelog.bullets as bullet}
                <p>• {bullet}</p>
            {/each}
        </div>
    {/each}
</div>

