<script>
    import {algolist, scheme, algo} from './store.js';
    import Icon from './Icon.svelte';

    let isVisible = false;

    function handleLoseFocus(e){
        console.log(e.target.classList)
        if(!e.target.classList.contains('algoRow') && !e.target.classList.contains('selectorFocusHandler')){
            isVisible=false;
        }
    }
</script>
<svelte:window on:click={handleLoseFocus}></svelte:window>
{#if isVisible}
<section class="algoPicker {$scheme}">
    {#each $algolist as algorithm}
        <div class="algoRow" on:click={()=>{algo.set(algorithm)}}>{algorithm}</div>
    {/each}
</section>
{/if}
<div class="selector {$scheme} selectorFocusHandler" on:click={()=>{isVisible=!isVisible}}>
    <!-- <div class="arrow"></div> -->
    <a class="selectorFocusHandler">{$algo}</a>
    <span class="selectorFocusHandler">ALGORITHM</span>
</div>

<style>
.selector{
    padding: 0 2em;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    flex-flow: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: cubic-bezier(0.86, 0, 0.07, 1) 300ms;
}
.selector span{
    font-family:'Spartan', sans-serif;
    text-align: center;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    margin-top:5px;
}
a{
    height: 24px;
    background-color: var(--primary);
    color: var(--darkest);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
}
.arrow{
    width: 8px;
    height: 8px;
    border-radius: 1px;
    transform: rotate(45deg);
    margin-top:4px;
    transition: 300ms;
}
.selector:hover .arrow{
    border-width:3px;
    transition: 300ms;
}
.dark .arrow{
    border-left: 2px solid rgba(255,255,255,0.66);
    border-top: 2px solid rgba(255,255,255,0.66);
}
.light .arrow{
    /* border-left: 2px solid rgba(0,0,0,0.66);
    border-top: 2px solid rgba(0,0,0,0.66); */
    border-left: 2px solid rgba(255,255,255,0.66);
    border-top: 2px solid rgba(255,255,255,0.66);
}
.dark span{
    color: var(--primary);
}
.light span{
    color: var(--primary);
}
.algoPicker{
    position: fixed;
    width: 192px;
    transform: translateY(calc(-100% + -10px));
    padding:1em;
    border-top-left-radius:1em;
    border-top-right-radius:1em;
}
.dark.algoPicker{
    background: linear-gradient(0deg, var(--darkest), var(--darker));
    color:var(--primary);
    box-shadow:0px -5px 5px rgba(0,0,0,0.2);
}
.light.algoPicker{
    background: linear-gradient(0deg, rgb(230,230,230), var(--brightest));
    color:var(--darker);
    box-shadow:0px -5px 5px rgba(0,0,0,0.2);
}
.algoRow{
    padding:10px 2em;
    text-transform: uppercase;
    border-radius:5px;
    -moz-user-select: none;
    -webkit-user-select: none;
    cursor:pointer;
}
.algoRow:hover{
    background-color:var(--primary);
    color:var(--darkest);
}
</style>