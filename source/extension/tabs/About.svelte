<script lang="ts">
    import { openPage } from "../../shared/utilities";

    const version = browser.runtime.getManifest().version;
    const extensionGithubURL = "https://github.com/albert-sun/extension";
    const personalGithubURL = "https://github.com/albert-sun";
    const discordInviteURL = "https://discord.gg/J6zfUvGkH2"; // Might change
    const paypalDonateURL = "https://www.paypal.com/donate?business=GFVTB9U2UGDL6&no_recurring=0&currency_code=USD";
    const tamperGithubURL = "https://github.com/albert-sun/tamper-scripts";
</script>

<div class="flex-column column-spacing-large content">
    <!-- Top row showing icon and about details -->
    <div class="flex-row row-spacing-large about-row">
        <img class="about-icon"
            src="../resources/icon_512.png"/>
        <div class="flex-column column-spacing-tiny about-list">
            <p><b>Advanced Automated Utilities v{version}</b> [<a on:click={() => { openPage(extensionGithubURL, true) }}>GitHub source</a>]</p>
            <p>Developed by <a on:click={() => { openPage(personalGithubURL, true) }}>Albert Sun</a> / akito#9528 on Discord</p>
            <p>Join the community <a on:click={() => { openPage(discordInviteURL, true) }}>Discord server</a> for development updates!</p>
            <br>
            <p>Feel free to <a on:click={() => { openPage(paypalDonateURL, true) }}>donate</a> if this extension helped, thank you!</p>
        </div>
    </div>

    <!-- Extension description I guess -->
    <p>
        Thanks for installing! This extension aims to enhance the graphics card
        purchasing experience for websites like Best Buy (and currently planned,
        EVGA for B-Stock). Inspired by my previously released 
        <a on:click={() => { openPage(tamperGithubURL, true) }}>Tampermonkey scripts</a> 
        and the older iteration of this extension, and now completely free of any
        document button clicking tracking shenanigans!
    </p>

    <!-- Notes and current bugs -->
    <div class="flex-column column-spacing-tiny about-list">
        <p style="text-decoration: underline">
            <b>Notes and current bugs / missing features:</b>
        </p>
        <p>
            • The current notification sounds for failure and rate-limiting are
            pretty awful, feel free to send me notification sound recommendations,
            thank you!
        </p>
        <p>
            • The setting for 're-queueing with response headers on successful
            cart' for Best Buy has been implemented but not tested (since there's
            nothing currently in-stock and queueable to test with). If you encounter
            any major issues, please notify me ASAP through Discord.
        </p>
    </div>
</div>

<style lang="scss">
    a { 
        color: rgb(0, 116, 204);
        text-decoration: underline; 
        cursor: pointer;
    }

    div.about-row {
        align-items: center;
    }
    
    img.about-icon {
        width: 128px;
        height: 128px;
    }
</style>