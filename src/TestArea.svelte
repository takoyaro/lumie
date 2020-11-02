<script>
	import * as ColorLib from 'color';
	import {algo,rgb,palette,alts,scheme,gradients,GenerateGradient,randomPrimaryColor} from './store.js';
    import cssVars from 'svelte-css-vars';
    import {onMount, afterUpdate} from 'svelte';
    import Icon from './Icon.svelte';
    import CSS from './CSS.svelte';
    const Color = ColorLib.default;

    $: currentScheme = $scheme;
    let container;

    onMount(()=>{
        console.log($alts);
        //alts.set($palette);
    });

    export let styleVars;

    let colors = ["darkest","darker","primary","brighter","brightest"];

    const randomNiceColor = ()=>{
	    return randomPrimaryColor($algo);
    }
    function randomize(){
        console.log(randomNiceColor());
        rgb.set([randomNiceColor(),randomNiceColor(),randomNiceColor()]);
        alts.set($palette);
    }
    
</script>

<div use:cssVars="{styleVars}" class="{$scheme}">
	<div class="testArea" class:has-bg-darkest-gradient={$scheme=="dark"} class:has-bg-brightest-gradient={$scheme=="light"}>
        <div class="container" style="height: calc(100vh - (10rem + 96px));" bind:this={container}>
            <h1 class="has-gradient-text">
                LUMIE
            </h1>
            <h2>
                The <span class="has-text-brighter lightweight">lightweight</span> color-palette tool<br/>Designed for Design dummies.
            </h2>
            <div class="box">
                <h3 class:has-text-brightest={$scheme=="dark"} class:has-text-darker={$scheme=="light"}>
                    <span class="has-text-primary">LUMIE</span> is a palette tool for people who have no idea what they're doing or simply looking for inspiration, with a simple and intuitive interface. It provides you with instant feedback in a nice and clean way as well as CSS code on the fly. <span class:has-text-brighter={$scheme=="dark"} class:has-text-darkest={$scheme=="light"}> As a matter of fact, the page you're currently reading is using a randomly generated palette.</span> Click LUMIE in the navbar to edit this palette.
                </h3>
                <div class="row">
                    <div class="column is-align-right"><a class="btn primary is-large" on:click={()=>{document.getElementById('LumieXtras').scrollIntoView({ behavior: 'smooth' });}}>Read More<i><Icon name="readme"/></i></a></div>
                    <div class="column is-align-left"><a class="btn brighter is-large" on:click={randomize}><i><Icon name="dice"/></i>Randomize</a></div>
                </div>

            </div>
        </div>
        <section id="LumieXtras" style="">
            <h1 class="uppercase has-text-primary">{$scheme} THEME</h1>
            <div class="row is-mobile">
            {#each colors as color}
                <div class="column is-one-fifth">
                    <div class="row">
                        <div class="column">
                            <div class="squircleBorder"><div class="previewCircle" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background-color:var(--{color});"></div></div>
                            <!-- <div class="previewBox" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background-color:var(--{color});">{styleVars[color]}</div> -->
                        </div>
                    </div>
                    <div class="row">
                        <span class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                    </div>
                    <div class="row">
                        <span class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                    </div>
                </div>
            {/each}
            </div>
            <div class="row is-mobile">
            {#each colors as color}
                <div class="column is-one-fifth">
                    <div class="row">
                        <div class="column">
                            <div class="squircleBorder opposite"><div class="previewCircle opposite" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background-color:var(--{color}Opp);"></div></div>
                            <!-- <div class="previewBox opposite" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background-color:var(--{color}Opp);">{styleVars[`${color}Opp`]}</div> -->
                        </div>
                    </div>
                    <div class="row">
                        <span class="opposite" class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                    </div>
                    <div class="row">
                        <span class="opposite" class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                    </div>
                </div>
            {/each}
            </div>
            <h1 class="uppercase opposite has-text-darker" >{($scheme=="dark") ? "LIGHT" : "DARK"} THEME</h1>
        </section>
        <h1 style="margin-top:1em;">CSS</h1>
        <div class="row" style="padding:1em;">
            <div class="column is-half has-text-centered">
                <h3 class="has-text-brighter has-text-bold">{($scheme=="dark") ? "DARK" : "LIGHT"}</h3>
            </div>
            <div class="column is-half has-text-centered">
                <h3 class="has-text-brighter has-text-bold">{($scheme=="dark") ? "LIGHT" : "DARK"}</h3>
            </div>
        </div>
        <div class="row" style="padding:1em;">
            <div class="column is-half" style="margin:1em 0 1em 1em;">
                <CSS vars={styleVars} theme="main"/>
            </div>
            <div class="column is-half" style="margin:1em 0 1em 1em;">
                <CSS vars={styleVars} theme="opposite"/>
            </div>
        </div>
        <section>
            <h1>Gradients</h1>
            <div class="row is-mobile">
                {#each colors as color}
                    <div class="column is-one-fifth">
                        <div class="row">
                            <div class="column">
                                <div class="squircleBorder"><div class="previewCircle" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background:var(--{color}Gradient);"></div></div>
                                <!-- <div class="previewBox" class:has-text-brightest={color=='darkest' || color=='darker'} class:has-text-darkest={color=='primary' || color=='brighter' || color=='brightest'} style="background-color:var(--{color});">{styleVars[color]}</div> -->
                            </div>
                        </div>
                        <div class="row">
                            <span class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                        </div>
                        <div class="row">
                            <span class:has-text-brighter={$scheme=="dark"} class:has-text-darker={$scheme=="light"}></span>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
	</div>
</div>


<style>
	.testArea{
		height:100%;
        max-width:100%;
		padding: 5rem 0rem;
		font-family:'Roboto', sans-serif;
		color: var(--main);
        display:block;
        transition:400ms;
        width:100%;
	}
    .container{
        padding:2rem 10rem;
    }
	h1,h2{
		color:var(--brighter);
		font-family: 'Spartan', sans-serif;
		text-align:center;
		text-transform:uppercase;
        transition:400ms;
	}
	h1{
		font-size:4em;
		font-weight:200;
		margin-bottom:5px;
	}
	h2{
        font-size:1.5em;
		font-weight:300;
	}
    h3{
        font-family:'Work Sans', sans-serif;
        font-size:1.5em;
        font-weight:300;
        transition:400ms;
        margin:0;
    }
    .has-gradient-text{
        background: -webkit-linear-gradient(90deg, var(--primary) 0%, var(--brightest) 150%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip:text;
    }
    .has-text-bold{
        font-weight:400;
    }
    .has-text-centered{
        text-align:center;
    }
	.primary-text{
		color: var(--primary) !important;
        transition:400ms;
	}
    .lightweight{
        font-weight:100;
        letter-spacing: -2px;
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
	}
    .row.is-mobile{
        margin-top:15px;
        padding-bottom:15px;
    }
    section{
        margin:2rem 0em;
        padding:2em 0em;
        width:100%;
    }
    .column.is-align-right{
        justify-content:flex-end;
    }
    .column.is-align-left{
        justify-content:flex-start;
    }
    :global(.column.is-1){
        width:calc(100% / 12);
    }
    :global(.column.is-2){
        width:calc(100% / 6);
    }
    :global(.column.is-3){
        width:calc(100% / 4);
    }
    :global(.column.is-4){
        width:calc(100% / 3);
    }
    .column.is-one-fifth{
        width:calc(100% / 5);
    }
    .column.is-half{
        width:50%;
    }
	.previewBox{
		height:48px;
		width:100%;
        transition:cubic-bezier(0.39, 0.575, 0.565, 1) 400ms;
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
	}
    .previewCircle{
		height:12em;
		width:12em;
        transition:cubic-bezier(0.39, 0.575, 0.565, 1) 400ms;
        border-radius:33%;
        margin:6px;
        filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.43));
	}
    .squircleBorder{
        border-radius:33%;
        width:12em;
        height:12em;
        margin:6px;
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 6px 0px;
    }
    a.btn{
        padding:5px;
        margin:5px 15px;
        border-radius:5px;
        transition:cubic-bezier(0.39, 0.575, 0.565, 1) 400ms;
        font-family:'Spartan', sans-serif;
        font-weight:600;
        text-transform: uppercase;
        user-select:none;
    }
    a.btn.is-large{
        padding: 15px;
        margin: 15px;
        border-radius: 5px;
        font-size: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 2rem;
        flex: 1;
    }
    a i{
        display: block;
        margin-top: 4px;
        box-sizing: border-box;
        width:24px;
        height:24px;
    }
    .btn.is-large:hover{
        cursor:pointer;
        transition:cubic-bezier(0.39, 0.575, 0.565, 1) 400ms;
    }
    .box{
        padding:2rem 5rem;
        border-radius:1rem;
        transition:400ms;
        text-align:justify;
        text-justify: distribute-all-lines;
    }
    :global(.has-bg-darkest){
        background-color:var(--darkest);
    }
    :global(.has-bg-darkest-gradient){
        background: linear-gradient(315deg, var(--darkestDarker) 0%, var(--darkest) 100%);
    }
    :global(.has-bg-darker){
        background-color:var(--darker);
    }
    .has-bg-darker-gradient{
        background: linear-gradient(315deg, var(--darkerDarker) 0%, var(--darker) 100%);
    }
    :global(.has-bg-primary){
        background-color:var(--primary);
    }
    :global(.has-bg-primary-gradient){
        background: linear-gradient(315deg, var(--primaryDarker) 0%, var(--primary) 100%);
    }
    :global(.has-bg-brighter){
        background-color:var(--brighter);
    }
    .has-bg-brighter-gradient{
        background: linear-gradient(315deg, var(--brighterBrighter) 0%, var(--brighter) 100%);
    }
    :global(.has-bg-brightest){
        background-color:var(--brightest);
    }
    :global(.has-bg-brightest-gradient){
        background: var(--brightestGradient)
    }
    .has-text-darkest{
        color:var(--darkest);
    }
    .has-text-darker{
        color:var(--darker);
    }
    .has-text-primary{
        color:var(--primary);
    }
    .has-text-brighter{
        color:var(--brighter);
    }
    .has-text-brightest{
        color:var(--brightest);
    }
    .has-text-darkest.opposite{
        color:var(--darkestOpp);
    }
    .has-text-darker.opposite{
        color:var(--darkerOpp);
    }
    .has-text-primary.opposite{
        color:var(--primaryOpp);
    }
    .has-text-brighter.opposite{
        color:var(--brighterOpp);
    }
    .has-text-brightest.opposite{
        color:var(--brightestOpp);
    }
    .uppercase{
        text-transform: uppercase;
    }
    :global(button.delete){
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: rgba(10,10,10,.2);
        border: none;
        border-radius: 290486px;
        cursor: pointer;
        pointer-events: auto;
        display: inline-block;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 0;
        height: 20px;
        max-height: 20px;
        max-width: 20px;
        min-height: 20px;
        min-width: 20px;
        outline: 0;
        position: relative;
        vertical-align: top;
        width: 20px;
    }
    .column:last-of-type>a.btn:last-of-type {
        margin-right: 0;
    }
    .column:first-of-type>a.btn:last-of-type {
        margin-left: 0;
    }
    .light .testArea{
        background: linear-gradient(315deg, var(--brightestBrighter) 0%, white 100%);
    }
    .light .box{
            box-shadow: 0 1rem 1rem rgba(0,0,0,0.2);
            background-color:rgba(0,0,0,0.1);
    }
    .light section#LumieXtras{
        background: linear-gradient(0deg, rgb(30,30,30) -200%, var(--darkestOpp) 50%, var(--brightest) 49%, var(--brighter) 200%);
            box-shadow: 0 -5px 10px 0 rgba(0,0,0,0.03);
    }
    .dark .box{
            box-shadow: 0 1rem 1rem var(--darkestDarker);
            background-color:rgba(0,0,0,0.1);
    }
    .dark section#LumieXtras{
            box-shadow: 0 -1px 15px 0 rgba(0,0,0,0.1);
            background: linear-gradient(0deg, var(--brighterOpp) -200%, var(--brightestOpp) 50%, var(--darkestDarker) 49%, var(--darkest) 200%);
    }
    /***************************
    /*
     Components
    /*
    ***************************/
    @media (prefers-color-scheme: dark) {
        
        .btn.primary{
        /* background: linear-gradient(315deg, var(--primaryDarker) 0%, var(--primary) 100%); */
        background: var(--primaryGradient);
        color:var(--darkerDarker);
        }
        .btn.primary:hover{
            filter: drop-shadow(0 0 0.25rem var(--primary));
        }
        .btn.brighter{
            background: linear-gradient(315deg, var(--brighter) 0%, var(--brighterBrighter) 100%);
            color:var(--darker);
        }
        .btn.brighter:hover{
            filter: drop-shadow(0 0 0.25rem var(--brighter));
        }
        :global(.btn.brightest){
            background-color:var(--brightest);
            color:var(--darker);
        }
        :global(.btn.brightest:hover){
            filter: drop-shadow(0 0 0.25rem var(--brightest));
        }
        .squircleBorder{
            background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0));
        }
        .squircleBorder.opposite{
            background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(120,120,120,0.1));
        }
        @-webkit-keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
        @-moz-keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
        @keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
    }

    @media (prefers-color-scheme: light) {
        
        .btn.primary{
            background: linear-gradient(315deg, var(--primaryDarker) 0%, var(--primary) 100%);
            color:var(--brightest);
        }
        .btn.primary:hover{
            filter: drop-shadow(0 0 0.25rem var(--primary));
        }
        .btn.brighter{
            background: linear-gradient(315deg, var(--brighter) 0%, var(--brighterBrighter) 100%);
            color:var(--darker);
        }
        .btn.brighter:hover{
            filter: drop-shadow(0 0 0.25rem var(--brighter));
        }
        :global(.btn.brightest){
            background-color:var(--brightest);
            color:var(--darker);
        }
        :global(.btn.brightest:hover){
            filter: drop-shadow(0 0 0.25rem var(--brightest));
        }
        
        .squircleBorder{
            background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(120,120,120,0.1));
        }
        .squircleBorder.opposite{
            background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0));
        }
    }
    /***************************
    /*
     Devices
    /*
    ***************************/
    @media (max-width: 575.98px) { 
        .row:not(.is-mobile){
            display:block;
        }
        .container{
            padding:2em 3em;
        }
        .box{
            padding:2em;
        }
        .previewBox{
            font-size:7px;
        }
        h1{
            font-size:3em;
        }
     }
    @media (max-width: 767.98px) { 
        .row:not(.is-mobile){
            display:block;
        }
        .container{
            padding:2em 3em;
        }
        .box{
            padding:2em;
        }
        .previewBox{
            font-size:7px;
        }
        h1{
            font-size:3em;
        }
     }
</style>
