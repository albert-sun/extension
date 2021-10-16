<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let display: string;                         // [INPUT] Left-aligned display input
    export let args: { [index: string]: any } = {};     // [INPUT] Optional arguments
    export let initialValue: number | string | boolean; // [OUTPUT] Input value
    let value = initialValue; // Mirrored but independent from settings
    
    // Dispatch change event whenever modified
    const dispatch = createEventDispatcher();
    $: dispatch("update", value);
</script>

<tr class="input-row">
    <td class="cell-left"> <!-- Display cell, 60% width -->
        <p>{display}</p>
    </td>
    <td class="cell-right flex-row row-spacing-small"> <!-- Input cell, 40% width and centered -->
        {#if typeof value === "number"}
            <input type=number 
                bind:value={value}
                min={args["min"] || undefined}
                max={args["max"] || undefined}/>
            {#if args["suffix"] !== undefined}
                <p>{args["suffix"]}</p>
            {/if}
        {:else if typeof value === "string"}
            <input bind:value={value}/>
            {#if args["suffix"] !== undefined}
                <p>{args["suffix"]}</p>
            {/if}
        {:else} <!-- Assume boolean, fancy checkbox -->
            <label class="switch">
                <input type=checkbox 
                    bind:checked={value}/>
                <span class="slider"/>
            </label>
        {/if}
    </td>
</tr>

<style lang="scss">
    /* Wrapper for input elements */
    tr.input-row {
        height: 2em;
        display: flex;
        flex-direction: row;
        align-items: center;

        td.cell-left { 
            width: 73%;
            white-space: nowrap;
            overflow: hidden;
            text-align: left; 
        }

        td.cell-right {
            width: 27%;
            justify-content: center;
            align-items: center;
            white-space: nowrap; 
            overflow: hidden;
            text-align: right;

            input {
                flex: 1;
                width: 100%;
            }
        }
    }

    /* Fancy slide switch input? */
    label.switch {
        position: relative;
        display: inline-block;
        width: 2.5em;
        height: calc(1.25em + 4px);

        input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        span.slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--color-lightgrey);
            border-radius: calc(1.25em + 4px);
            transition: 0.2s;

            &:before { 
                position: absolute;
                content: "";
                height: calc(1.25em - 4px);
                width: calc(1.25em - 4px);
                left: 4px;
                bottom: 4px;
                border-radius: 50%;
                background-color: var(--color-white);
                transition: 0.2s;
            }
        }

        input:checked + span.slider { background-color: var(--color-teal-dark); }
        input:checked + span.slider:before { transform: translateX(calc(1.25em - 4px)); } 
        input:focus + span.slider { box-shadow: 0 0 1px var(--color-teal-dark); }
    }
</style>