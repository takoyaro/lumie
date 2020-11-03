<script>
	import cssVars from 'svelte-css-vars';
	import * as ColorLib from 'color';
	import {alts,rgb,brightness,saturation,hue,palette,scheme} from './store.js';
	import {afterUpdate, onMount} from 'svelte';
	
	export let colorType = "rgb";
	export let color;
	export let disabled;
	let bound = ()=>{
		if(colorType="rgb"){
			return (color=="red") ? 0 : (color=="green") ? 1 : 2;
		}
	}
	$: primaryHSL = ColorLib.default.rgb($alts[$scheme].primary).hsl().array();
	$: styleVars = {
		redColorStart: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb(0,$alts[$scheme].primary[1],$alts[$scheme].primary[2]),1).hsl().string(),
		redColorEnd: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb(255,$alts[$scheme].primary[1],$alts[$scheme].primary[2]),1).hsl().string(),
		greenColorStart: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb($alts[$scheme].primary[0],0,$alts[$scheme].primary[2]),1).hsl().string(),
		greenColorEnd: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb($alts[$scheme].primary[0],255,$alts[$scheme].primary[2]),1).hsl().string(),
		blueColorStart: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb($alts[$scheme].primary[0],$alts[$scheme].primary[1],0),1).hsl().string(),
		blueColorEnd: ColorLib.default.rgb($alts[$scheme].primary).mix(ColorLib.default.rgb($alts[$scheme].primary[0],$alts[$scheme].primary[1],255),1).hsl().string(),
  	    saturationColorStart: `hsl(${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[0]},0%,${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[2]}%)`,
		saturationColorStop: `hsl(${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[0]},100%,${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[2]}%)`,
		brightnessColorStart: `hsl(${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[0]},${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[1]}%,0%)`,
		brightnessColorStop: `hsl(${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[0]},${ColorLib.default.rgb($alts[$scheme].primary).hsl().color[1]}%,100%)`
	};
	
	let hueSlider,saturationSlider,brightnessSlider;
	onMount(()=>{
		updateHSL();
	});
	afterUpdate(()=>{
	});
	
	function saturate(e){
		let saturation = parseInt(e.srcElement.value);
		let hue = ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[0];
		let brightness = (ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[2]==0) ? 1 : (ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[2]==100) ? 99 : ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[2];
		let finalHSL = [hue,saturation,brightness];
		const finalColor = ColorLib.default.hsl(finalHSL).rgb().array();
		console.log(finalColor);
		rgb.set(finalColor);
		updateSaturation();
		updateBrightness();
		updateHue();
	}
	function illuminate(e){
		let luminosity = parseFloat(brightnessSlider.value);
		let hue = 		 ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[0];
		let saturation = ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[1];
		let finalHSL = [hue,saturation,luminosity];
		const finalColor = ColorLib.default.hsl(finalHSL).rgb().array();
		rgb.set(finalColor);
		updateSaturation();
		updateBrightness();
		updateHue();
	}
	function rotate(e){
		let hue = parseFloat(hueSlider.value);
		let luminosity = ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[2];
		let saturation = ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[1];
		let finalHSL = [hue,saturation,luminosity];
		const finalColor = ColorLib.default.hsl(finalHSL).rgb().array();
		rgb.set(finalColor);
		updateSaturation();
		updateBrightness();
		updateHue();
	}
	function updateSaturation(){
		saturation.set(ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[1]);
	}
	function updateBrightness(){
		brightness.set(ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[2]);
	}
	function updateHue(){
		hue.set(ColorLib.default.rgb($alts[$scheme].primary).hsl().array()[0]);
	}
	function updateHSL(){
		rgb.set([$alts[$scheme].primary[0],$alts[$scheme].primary[1],$alts[$scheme].primary[2]]);
		updateSaturation();
		updateBrightness();
		updateHue();
	}
</script>
<div use:cssVars="{styleVars}">
{#if colorType=="rgb"}
<input type="range" min="0" max="255" bind:value={$alts[$scheme].primary[bound()]} class="slider" class:red={color=="red"} class:blue={color=="blue"} class:green={color=="green"} on:input={updateHSL} {disabled}>
{/if}
{#if colorType=="saturation"}
<input type="range" min="1" max="99" class="slider saturation" bind:this={saturationSlider} on:input={saturate} value={$saturation} {disabled}>
{/if}
{#if colorType=="brightness"}
	<input type="range" min="1" max="99" class="slider brightness" bind:this={brightnessSlider} on:input={illuminate} value={$brightness} disabled={disabled}>
{/if}
	{#if colorType=="hue"}
	<input type="range" min="0" max="359" class="slider hue" bind:this={hueSlider} on:input={rotate} value={$hue} {disabled}>
{/if}
	</div>
<style>
input[type=range] {
  height: 26px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
	background-color:rgba(0,0,0,0);
	border:unset;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 14px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #50555C;
  background: rgb(0,0,0);
  border-radius: 14px;
  border: 0px solid #000000;
}
	input[type=range].red::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, var(--redColorStart) 0%, var(--redColorEnd) 100%);
	}
	input[type=range].green::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, var(--greenColorStart) 0%, var(--greenColorEnd) 100%);
	}
	input[type=range].blue::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, var(--blueColorStart) 0%, var(--blueColorEnd) 100%);
	}
	input[type=range].saturation::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, var(--saturationColorStart) 0%, var(--saturationColorStop) 100%);
	}
	input[type=range].brightness::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, var(--brightnessColorStart) 0%, var(--brightnessColorStop) 100%);
	}
	input[type=range].hue::-webkit-slider-runnable-track {
		background: linear-gradient(90deg, hsl(0,50%,50%) 0%,hsl(36,50%,50%) 10%, hsl(72,50%,50%) 20%,hsl(108,50%,50%) 30%,hsl(144,50%,50%) 40%,hsl(180,50%,50%) 50%,hsl(216,50%,50%) 60%,hsl(252,50%,50%) 70%,hsl(288,50%,50%) 80%,hsl(324,50%,50%) 90%,hsl(360,50%,50%) 100%);
	}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 20px;
  width: 20px;
  border-radius: 12px;
  background: #529DE1;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3px;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 14px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #50555C;
  background: rgb(0,0,0);
  border-radius: 14px;
  border: 0px solid #000000;
}
input[type=range].red::-moz-range-track{
	background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 100%);
}
input[type=range].green::-moz-range-track{
	background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,255,0,1) 100%);
}
input[type=range].blue::-moz-range-track{
	background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,255,1) 100%);
}
input[type=range].saturation::-moz-range-track{
	background: linear-gradient(90deg, var(--saturationColorStart) 0%, var(--saturationColorStop) 100%);
}
input[type=range].brightness::-moz-range-track{
	background: linear-gradient(90deg, var(--brightnessColorStart) 0%, var(--brightnessColorStop) 100%);
}
input[type=range].hue::-moz-range-track{
	background: linear-gradient(90deg, hsl(0,50%,50%) 0%,hsl(36,50%,50%) 10%, hsl(72,50%,50%) 20%,hsl(108,50%,50%) 30%,hsl(144,50%,50%) 40%,hsl(180,50%,50%) 50%,hsl(216,50%,50%) 60%,hsl(252,50%,50%) 70%,hsl(288,50%,50%) 80%,hsl(324,50%,50%) 90%,hsl(360,50%,50%) 100%);
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 20px;
  width: 40px;
  border-radius: 12px;
  background: #529DE1;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 14px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #50555C;
  border: 0px solid #000000;
  border-radius: 28px;
  box-shadow: 1px 1px 1px #50555C;
}
input[type=range]::-ms-fill-upper {
  background: #50555C;
  border: 0px solid #000000;
  border-radius: 28px;
  box-shadow: 1px 1px 1px #50555C;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 20px;
  width: 40px;
  border-radius: 12px;
  background: #529DE1;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #50555C;
}
input[type=range]:focus::-ms-fill-upper {
  background: #50555C;
}
</style>