<script>
    import Icon from './Icon.svelte';
    import {algo,rgb,alts,palette,scheme,savedPalettes,showPaletteLoader,GenerateTakoColors,gradients,GenerateUnifiedColors,GenerateTakoColors2,GenerateShadesColor} from './store.js';
    import * as ColorLib from 'color';
    const Color = ColorLib.default;
    import {afterUpdate, onMount} from 'svelte';

    $: currentScheme = ($scheme == "dark") ? ['dark','light'] : ['light','dark'];
    let footerHeight = 0;
    afterUpdate(()=>{
        if(document.getElementById('footer')){
            footerHeight = document.getElementById('footer').getBoundingClientRect().height;
        }
    })
    onMount(()=>{

    })

    const uniquePalette = (paletteAlgo,primary)=>{
        if(paletteAlgo=="unified"){
            return GenerateUnifiedColors(primary);
        }
        if(paletteAlgo=="tako"){
            return GenerateTakoColors2(primary);
        }
        if(paletteAlgo=="shades"){
            return GenerateShadesColor(primary);
        }
    }

    function deletePalette(name){
        let oldStorage = JSON.parse(localStorage.getItem('palettes'));
        let newStorage = oldStorage.filter(palette=>palette.name!==name);
        console.log(newStorage);
        localStorage.removeItem('palettes');
        localStorage.setItem('palettes',JSON.stringify(newStorage));
        savedPalettes.set(JSON.parse(localStorage.getItem('palettes')));
    }

    function LoadPalette(palette){
        let name = palette.name;
        let rgbArr = palette.primary;
        let algorithm = palette.algo;
        algo.set(algorithm);
        rgb.set(rgbArr);
        console.log(palette);
    }

    function handleKeyboard(e){
        if(e.keyCode==27) showPaletteLoader.set(false);
    }
</script>
<svelte:window on:keyup={handleKeyboard}></svelte:window>
{#if $showPaletteLoader==true}
<div class="paletteLoader" style="height: calc(100vh - {footerHeight}px);">
    <div class="container">
        {#each $savedPalettes as palette}
        <div class="row singlePalette">
            <div class="column">
                <div class="row">
                    <div class="column is-one-fifth" style="display:flex"><h1 style="background: linear-gradient(315deg, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.primaryDarker).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.primary).string()} 0%, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.primaryBrighter).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.darker).string()} 100%);">{palette.name}</h1></div>
                    <div class="column is-1" style="display:flex" on:click={()=>{LoadPalette(palette)}}><Icon name="download"/></div>
                    <div class="column is-1" style="display:flex" on:click={()=>{deletePalette(palette.name);}}><Icon name="trash"/></div>
                </div>
                <div class="row align-right">
                    <div class="column is-2 colorSwatch" style="
                    background: linear-gradient(315deg, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.darkest).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.brightestBrighter).string()} 0%, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.darkestDarker).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.brighter).string()} 100%);
        
                    ">
                        <div class="row"><div class="column"><h2 style="background: -webkit-linear-gradient(315deg, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.brighter).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.darker).string()}, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).dark.brightest).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).light.darkest).string()});">{($scheme=='dark') ? 'DARK' : 'LIGHT'}</h2></div></div>
                        <div class="row full-height">
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[0]].darkest).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[0]].darker).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[0]].primary).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[0]].brighter).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[0]].brightest).string()}"></div>
                        </div>
                    </div>
                    <div class="column is-2 colorSwatch" style="
                    background: linear-gradient(315deg, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).light.brightestBrighter).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).dark.darkest).string()} 0%, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).light.brightestBrighter).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).dark.darkest).string()} 100%);
                    ">
                        <div class="row"><div class="column"><h2 style="background: -webkit-linear-gradient(315deg, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).light.primaryBrighter).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).dark.brighter).string()}, {($scheme=='dark') ? Color.rgb(uniquePalette(palette.algo,palette.primary).light.darkest).string() : Color.rgb(uniquePalette(palette.algo,palette.primary).dark.darker).string()});">{($scheme=='dark') ? 'LIGHT' : 'DARK'}</h2></div></div>
                        <div class="row full-height">
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[1]].darkest).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[1]].darker).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[1]].primary).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[1]].brighter).string()}"></div>
                            <div class="column colorBlock" style="background-color:{Color.rgb(uniquePalette(palette.algo,palette.primary)[currentScheme[1]].brightest).string()}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>
{/if}
<style>
    .paletteLoader{
        z-index: 1020; /* Saving Modal is 1010. The Palette Loader should be above it at all times.*/
        position: fixed;
        top: 0;
        width: 100%;
        background-color:rgb(20,20,20);
        color:white;
        overflow-y:scroll;
        scroll-behavior: smooth;
    }
    .container{
        padding:2em;
    }
    .row{
        display: flex;
        align-items: baseline;
    }
    .row.full-height{
        height:100%;
        align-items:center;
    }
    .row.align-right{
        justify-content: flex-end;
    }
	.column{
		display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        padding: .75rem;
	}
    .column:first-of-type:not(.colorSwatch){
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        overflow:hidden;
    }
    .column:last-of-type:not(.colorSwatch){
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        overflow:hidden;
    }
    .colorSwatch{
        margin:0 15px;
        border-radius:1em;
    }
    .colorBlock{
        height:100%;
        margin:unset;
    }
    .column.is-2{
        max-width: 33%;
        width: 33%;
        flex:none;
    }
    .column.is-1{
        flex:none;
        width:24px;
    }
    .column.is-one-fifth{
        flex:none;
        width:calc(100% / 5);
    }
    .full-height>.column:first-of-type {
        justify-content: flex-end;
        flex-direction: row;
    }
    h1{
        font-family:'Spartan', sans-serif;
        text-transform: uppercase;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip:text !important;
        background-size:50%;
        font-weight:200;
    }
    h2{
        font-family:'Spartan', sans-serif;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip:text !important;
        background-size:50%;
    }  
    .singlePalette{
        margin: 5px;
        background-color: rgba(200,200,200,0.1);
        border-radius: 10px;
    }
    .has-dark-gradient-bg{

    }
    .has-light-gradient-bg{

    }
</style>