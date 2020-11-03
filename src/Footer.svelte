<script>
    import {rgb, alts,algo,palette,scheme,showSaveModal,savedPalettes,showPaletteLoader,randomPrimaryColor} from './store.js';
    import cssVars from 'svelte-css-vars';
    import * as ColorLib from 'color';
    import Icon from './Icon.svelte';
    import AlgoPicker from './AlgoPicker.svelte';
    const Color = ColorLib.default;

    export let styleVars;
    const randomNiceColor = ()=>{
	    return randomPrimaryColor($algo);
    }
    function randomize(){
        console.log(randomNiceColor());
        rgb.set([randomNiceColor(),randomNiceColor(),randomNiceColor()]);
        alts.set($palette);
    }
    $: schemesArr = ($scheme=='dark') ? ['dark','light'] : ['light', 'dark'];
</script>

<footer use:cssVars="{styleVars}" class="{$scheme}" id="footer">
    <div class="row">
        <div class="algo"><AlgoPicker/></div>
        <div class="switchContainer" class:darker={$scheme=='dark'} class:darkest={$scheme=='light'}><label class="switch"><input type="checkbox" on:click={()=>{scheme.set(schemesArr[1]);console.log($scheme);}} checked={$scheme=='light'}><span class="slider"></span></label><span>LIGHTS <strong>{($scheme=='dark') ? 'OFF' : 'ON'}</strong></span></div>
        <div class="btn is-right" class:darker={$scheme=='dark'} class:darkest={$scheme=='light'} on:click={randomize}><i><Icon name='dice'/></i>Randomize</div>
        <div class="btn is-right" class:darker={$scheme=='dark'} class:darkest={$scheme=='light'} on:click={()=>{showPaletteLoader.set(!$showPaletteLoader)}}><i><Icon name={($showPaletteLoader==false) ? 'bucket' : 'close'}/></i>{($showPaletteLoader) ? "Close" : "Palettes"}<small>{($savedPalettes!==null) ? $savedPalettes.length : 0}</small></div>
        <div class="btn is-right" class:darker={$scheme=='dark'} class:darkest={$scheme=='light'} on:click={()=>{showSaveModal.set(true)}}><i><Icon name="cloud"/></i>Save</div>
    </div>
    <div class="row credits">
        <span class="has-bg-darkerDarker has-text-brightest">Built with ❤️ and <Icon name="svelte"/> <a class="has-text-bold" href="https://svelte.dev">Svelte</a> in 🇯🇵 by <a class="primary" href="https://github.com/takoyaro">@takoyaro</a></span>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap');
    footer{
        width:100%;
        position:sticky;
        font-family:'Spartan', sans-serif;
        display: flex;
        position: fixed;
        bottom: 0px;
        box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.5);
        flex-flow: column;
    }
    footer *{
        transition: 300ms;
    }
    .row{
        display: flex;
        flex-flow: row;
        flex: 1;
        justify-content: space-around;
        padding: 5px 0 0 0;
    }
    .dark .row{
        background-color: var(--darker);
    }
    .light .row{
        background-color:var(--darkest);
    }
    footer span{
        font-family:'Spartan', sans-serif;
        text-align: center;
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
    }
    .credits a{
        margin: 3px 5px 0px 5px !important;
    }
    .credits span{
        padding:5px 0px;
    }
    :global(.credits svg){
        margin: 0px 0px 0px 5px;
    }
    a{
        display:inline-flex;
        text-decoration: unset;
        color:#ff3e00; /* Svelte Color*/
    }
    a:visited{
        color:#ff3e00; /* Svelte Color*/
    }
    a.primary{
        color:var(--primary);
    }
    a.primary:visited{
        color:var(--primaryDarker);
    }
    .has-text-bold{
        font-weight:600;
    }
    .has-bg-darkerDarker{
        background-color:var(--darkerDarker);
    }
    .has-text-brightest{
        color:var(--brightest);
    }
    .row>div{
        flex:1;
        padding:5px 10px;
    }
    .btn{
        font-weight: 400;
        text-transform: uppercase;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor:pointer;
        transition: 300ms;
        border-radius: 5px;
    }
    .btn:hover{
        transition: 300ms;
    }
    .dark .btn.darker{
        background-color:var(--darker);
        color:var(--brighter)
    }
    .dark .btn.darker:hover{
        background-color:var(--darkest);
    }
    .light .btn.darker{
        background-color:var(--darker);
        color:var(--darkest);
    }
    .light .btn.darker:hover{
        background-color:var(--darkest);
        color:var(--brighter);
    }
    .light .btn.darkest{
        background-color:var(--darkest);
        color:var(--primary);
    }
    .light .btn.darkest:hover{
        background-color:var(--primary);
        color:var(--darkest);
    }
    .btn.primary{
        background-color: var(--primary);
        color: var(--darkest);
    }
    .btn.primary:hover{
        background-color:var(--brighter);
        color:var(--darkest);
    }
    .btn.brighter{
        background-color:var(--brighter);
        color:var(--darker);
    }
    .btn.brighter:hover{
        background-color:var(--brighterBrighter);
        color:var(--darkest);
    }
    .btn small{
        position: absolute;
        top: 5px;
        padding: 2px 5px;
        border-radius: 50%;
        font-weight: 700;
        transform: translate(200%);
    }
    .dark .btn small{
        background-color: var(--brighter);
        color: var(--darker);
    }
    .light .btn small{
        background-color: var(--brighter);
        color: var(--darkest);
    }
    span strong{
        margin-left:3px;
    }
    .algo{
        height:100%;
        display: flex;
        flex-flow: column;
    }
    .dark .algo{
        background-color:var(--darker);
        
    }
    .light .algo{
        background-color:var(--darkest);
        color:var(--brighter)
    }
    .switchContainer{
        padding: 0 10px;
        display: flex;
        align-items: center;
        flex-flow:column;
    }
    .switchContainer.darker{
        background-color:var(--darker);
        color:var(--brighter);
    }
    .switchContainer.darkest{
        background-color:var(--darkest);
        color:var(--primary);
    }
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 24px;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .25s;
    border-radius:23px;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .25s;
    transition: .25s;
    border-radius: 50%;
    }

    input:checked + .slider {
    background: linear-gradient(137.5deg, var(--primary) 0%, var(--primaryDarker) 100%);
    }

    input:focus + .slider {
    box-shadow: 0 0 1px var(--primary);
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(36px);
    -ms-transform: translateX(36px);
    transform: translateX(36px);
    }
    /***************************
    /*
     Components
    /*
    ***************************/
    @media (prefers-color-scheme: dark) {
        
    }

    @media (prefers-color-scheme: light) {
        
    }
    /***************************
    /*
     Devices
    /*
    ***************************/
    @media (max-width: 575.98px) { 

     }
    @media (max-width: 767.98px) { 
       
     }
</style>
