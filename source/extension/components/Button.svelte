<script lang="ts">
    export let display: string = ""; // [INPUT] Display text for button
    export let disabled: boolean;    // [INPUT] Whether to disable the button
    export let onclick: Function;    // [INPUT] Onclick handler for function
    export let args: any[] = [];     // [INPUT] Arguments to pass to onclick function

    // Check whether button should be disabled before processing
    function processClick() {
        if(disabled === false) {
            onclick(...args);
        }
    }
</script>

<a class="button"
    class:button-enabled={disabled === false}
    class:button-disabled={disabled === true}
    on:click={processClick}>
    {display}
</a>

<style lang="scss">
    a.button {
        display: inline-block;
        padding: 0.25em 0.5em 0.25em 0.5em;
        text-decoration: none;
        border-radius: 0.125em;
        color: var(--color-white);
        user-select: none;
        transition: 0.2s;

        &.button-enabled {
            cursor: pointer;
            background-color: var(--color-teal-dark);

            &:hover { background-color: var(--color-teal-darker); }
            &:active { background-color: var(--color-teal-darkest); }
        }
        &.button-disabled {
            cursor: not-allowed;
            background-color: var(--color-darkgrey);
        }
    }
</style>