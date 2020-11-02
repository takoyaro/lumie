<script>
	import {algo,rgb, alts,palette,scheme} from './store.js';
	import CustomSlider from './CustomSlider.svelte';
	import * as ColorLib from 'color';
    import {afterUpdate} from 'svelte';
	export let main;
	export let index;
    const Color = ColorLib.default;

    $: mainColor = Color.rgb($palette[$scheme].primary).string();
    $: darkest = Color.rgb($alts[$scheme].darkest).string();
    $: darker = Color.rgb($alts[$scheme].darker).string();
    $: brighter = Color.rgb($alts[$scheme].brighter).string();
    $: brightest = Color.rgb($alts[$scheme].brightest).string();

	let footerHeight = 0;
    afterUpdate(()=>{
        // darkest = Color.rgb($alts.darkest).string();
        // darker = Color.rgb($alts.darker).string();
        // brighter = Color.rgb($alts.brighter).string();
        // brightest = Color.rgb($alts.brightest).string();
		//alts.set($palette);
		if(document.getElementById('footer')){
            footerHeight = document.getElementById('footer').getBoundingClientRect().height;
        }
	})
	let noSat = ['unified','shades'];
	let noLight = ['unified'];
	let noRGB = ['shades','unified'];
</script>

<div class="container" style="height: calc(100% - {footerHeight}px);">
	{#if main}
		{#if !noRGB.includes($algo)}
			<div class="sliderRow">
				<CustomSlider colorType="rgb" color="red" disabled={!main}/>
			</div>
			<div class="sliderRow">
				<CustomSlider colorType="rgb" color="green" disabled={!main}/>
			</div>
			<div class="sliderRow">
				<CustomSlider colorType="rgb" color="blue" disabled={!main}/>
			</div>
		{/if}
		{#if !noSat.includes($algo)}
		<div class="sliderRow">
			<CustomSlider colorType="saturation" disabled={!main}/>
		</div>
		{/if}
		{#if !noLight.includes($algo)}
		<div class="sliderRow">
			<CustomSlider colorType="brightness" disabled={!main}/>
		</div>
		{/if}
		<div class="sliderRow">
			<CustomSlider colorType="hue" disabled={!main}/>
		</div>
		<div class="result-box">
			<input type="text" value={mainColor}/>
		</div>
	{/if}
</div>

<style>
	.container{
		width: calc(20% - (13px/2*5));
        padding: 5px 15px;
        border-radius: 5px;
        margin: 5px 0 15px 0;
		vertical-align: top;
		position:absolute;
		right:0px;
		display: flex;
		flex-flow: column;
		justify-content: center;
	}
	.display{
		width:100%;
		height:25vh;
		display:flex;
		border-radius:5px;
	}
	.display.full{
		height:100%;
	}
	input{
		width:100%;
	}
	input[type="text"]{
		padding:5px;
		margin-top:5px;
		max-width:100%;
		display:block;
		background-color:rgba(0,0,0,0.1);
		color:white;
		border:1px solid rgb(50,50,50);
		border-radius:5px;
		text-align:center;
	}
	.result-box{
		display:flex;
	}
	@media (prefers-color-scheme: light) {
        .container{
            background-color:rgb(202, 156, 156);
            
        }
        input[type="text"]{
            background-color:rgba(255,255,255,0.9);
            border-color:rgb(201, 201, 201);
            color:#333;
        }
    }
    @media (prefers-color-scheme: dark) {
        .container{
            background-color:rgba(0,0,0,0.1);
        }
        input[type="text"]{
            color:#ccc;
        }
    }
</style>