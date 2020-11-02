<script>
    import {algo,scheme,alts,showSaveModal,rgb,savedPalettes} from './store.js';
    import cssVars from 'svelte-css-vars';
    import { fade } from 'svelte/transition';
    export let styleVars;

    let nameInput;
    function formatName(e){
        nameInput.value = nameInput.value.replace(/\W/g, '');
        if(e.keyCode){
            if(e.keyCode==13){
                if(localStorage.getItem('palettes')!==null){
                    let oldStorage = JSON.parse(localStorage.getItem('palettes'));
                    console.log(oldStorage);
                    let newStorage = [...oldStorage,...[{name:nameInput.value,primary:$rgb,algo:$algo}]];
                    console.log(newStorage);
                    localStorage.setItem('palettes',JSON.stringify(newStorage));
                    nameInput.value = '';
                    showSaveModal.set(false);
                    savedPalettes.set(JSON.parse(localStorage.getItem('palettes')));
                }
                else{
                    localStorage.setItem('palettes',JSON.stringify([{name:nameInput.value,primary:$rgb,algo:$algo}]));
                    nameInput.value = '';
                    showSaveModal.set(false);
                    savedPalettes.set(JSON.parse(localStorage.getItem('palettes')));
                }
            }
        }
    }
    function closeWindow(e){
        if(e.keyCode==27){
                showSaveModal.set(false);
        }
    }
</script>
<svelte:window on:keyup={closeWindow}></svelte:window>
<div use:cssVars={styleVars}>
    {#if $showSaveModal==true}
    <div class="modal" class:closed={$showSaveModal==false} id="modal">
        <h1>Give your Palette a name</h1>
        <div class="row" style="padding:1em;">
            <input type="text" placeholder="Lumie" bind:this={nameInput} on:input={formatName} on:keyup={formatName}/>
        </div>
        <div class="container">
            <div class="row">
                <div class="column"><div class="colorPreview" style="background-color:var(--darkest)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--darker)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--primary)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--brighter)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--brightest)"></div></div>
            </div>
            <div class="row">
                <div class="column"><div class="colorPreview" style="background-color:var(--darkestOpp)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--darkerOpp)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--primaryOpp)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--brighterOpp)"></div></div>
                <div class="column"><div class="colorPreview" style="background-color:var(--brightestOpp)"></div></div>
            </div>
        </div>
    </div>
    {/if}
</div>
<div class="modal-overlay" class:closed={$showSaveModal==false} id="modal-overlay" transition:fade on:click={()=>{showSaveModal.set(false)}}>
</div>

<style>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1010;
        display:block;
        background-color:rgba(0,0,0,0.8);
        color:white;
        width:450px;
        border-radius:1em;
        animation-duration: 300ms;
        animation-name: slidein;
    }
    @keyframes slidein {
        from {
            top:100%;
            opacity:0;
        }

        to {
            top:50%;
            opacity:1;
        }
    }
    @keyframes fadein{
        from{
            opacity:0;
        }
        to{
            opacity:1;
        }
    }
    .modal.closed {
    
        display: none;

    }
    .modal-overlay {
            /* recommendation:
            don't focus on the number "1000" here, but rather,
            you should have a documented system for z-index and 
            follow that system. This number should be pretty
            high on the scale in that system.
            */
            z-index: 1000;

            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color:rgba(0,0,0,0.8);
            animation-duration: 300ms;
            animation-name: fadein;
    }
    .modal-overlay.closed{
        display:none;
    }
    .container{
        padding:2em;
    }
    .row{
        display: flex;
	}
	.column{
		display: flow-root;
        flex-direction: row;
        flex-flow: row;
        flex-grow: 100;
        justify-content: space-evenly;
        margin:5px 0px;
	}
    .column:first-of-type{
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        overflow:hidden;
    }
    .column:last-of-type{
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        overflow:hidden;
    }
    .colorPreview{
        height:48px;
    }
    h1{
        font-size:2em;
        font-family:'Spartan', sans-serif;
        font-weight:200;
        color:var(--primary);
        padding:1em 2em 0 2em;
        text-align:center;
    }
    input[type="text"]{
        background-color: rgb(20,20,20);
        color:var(--brightest);
        padding:1em;
        width:100%;
        border: solid 2px var(--darker);
        border-radius:0.5em;
        font-family: 'Spartan', sans-serif;
        font-weight:500;
        font-size:1.5em;
        text-align:center;
    }
    input:active,input:focus{
        border: solid 2px var(--primary);
        border-radius:0.5em;
        outline:unset;
    }
</style>