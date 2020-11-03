<script>
  	import ColorPicker from './ColorPicker.svelte';
	import Footer from './Footer.svelte';
	import Modal from './Modal.svelte';
	import Navbar from './Navbar.svelte';
	import TestArea from './TestArea.svelte';
	import PaletteLoader from './PaletteLoader.svelte';
	import * as ColorLib from 'color';
	import {alts, menuIndex,scheme,palette,savedPalettes,showPaletteLoader,gradients} from './store.js';
	import { fly,slide } from 'svelte/transition';
	import {afterUpdate, onMount} from 'svelte';
	import cssVars from 'svelte-css-vars';

	const Color = ColorLib.default;
	const DARK = '(prefers-color-scheme: dark)'
	const LIGHT = '(prefers-color-scheme: light)'
	let cssVariables = {};
	$: updatedScheme = (window.matchMedia(DARK).matches==true) ? 'dark' : 'light';
	$: styleVars = cssVariables;
	onMount(()=>{
		alts.set($palette);
		savedPalettes.set(JSON.parse(localStorage.getItem('palettes')));
		scheme.set(updatedScheme);
	})
	afterUpdate(()=>{
		alts.set($palette);
		cssVariables = {
			primary: Color.rgb($alts[$scheme].primary).string(),
			primaryDarker: Color.rgb($alts[$scheme].primaryDarker).string(),
			primaryBrighter: Color.rgb($alts[$scheme].primaryBrighter).string(),
			darkest: Color.rgb($alts[$scheme].darkest).string(),
			darkestDarker: Color.rgb($alts[$scheme].darkestDarker).string(),
			darker: Color.rgb($alts[$scheme].darker).string(),
			darkerDarker: Color.rgb($alts[$scheme].darkerDarker).string(),
			brighter: Color.rgb($alts[$scheme].brighter).string(),
			brighterBrighter: Color.rgb($alts[$scheme].brighterBrighter).string(),
			brightest: Color.rgb($alts[$scheme].brightest).string(),
			brightestBrighter: Color.rgb($alts[$scheme].brightestBrighter).string(),
			primaryOpp: ($scheme == 'light') ? Color.rgb($alts.dark.primary).string() : Color.rgb($alts.light.primary).string(),
			darkestOpp: ($scheme == 'light') ? Color.rgb($alts.dark.darkest).string() : Color.rgb($alts.light.darkest).string(),
			darkerOpp: ($scheme == 'light') ? Color.rgb($alts.dark.darker).string() : Color.rgb($alts.light.darker).string(),
			brighterOpp: ($scheme == 'light') ? Color.rgb($alts.dark.brighter).string() : Color.rgb($alts.light.brighter).string(),
			brightestOpp: ($scheme == 'light') ? Color.rgb($alts.dark.brightest).string() : Color.rgb($alts.light.brightest).string(),
			primaryGradient: $gradients[$scheme].primary,
			darkestGradient: $gradients[$scheme].darkest,
			darkerGradient: $gradients[$scheme].darker,
			brighterGradient: $gradients[$scheme].brighter,
			brightestGradient: $gradients[$scheme].brightest,
			primaryGradientOpp: ($scheme == 'light') ? $gradients.dark.primary : $gradients.light.primary,
			darkestGradientOpp: ($scheme == 'light') ? $gradients.dark.darkest : $gradients.light.darkest,
			darkerGradientOpp: ($scheme == 'light') ? $gradients.dark.darker : $gradients.light.darker,
			brighterGradientOpp: ($scheme == 'light') ? $gradients.dark.brighter : $gradients.light.brighter,
			brightestGradientOpp: ($scheme == 'light') ? $gradients.dark.brightest : $gradients.light.brightest,
			radialGradient: $gradients[$scheme].radial
		}
		styleVars = cssVariables;
	})
	window.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', event => {
		if (event.matches) {
			scheme.set('dark');
			console.log('Switched to Dark Mode');
		} else {
			scheme.set('light');
			console.log('Switched to Light Mode');
		}
	})
</script>
<Navbar {styleVars}/>
{#if $menuIndex==0}
<div in:fly={{y:100,delay:200}} out:fly={{y:100,delay:0}} style="height:100%" use:cssVars={styleVars}>
	<div class="palette" style="background:var({($scheme=='dark') ? '--darkestGradient' : '--brightestGradient'});background-size:150%;">
		<div class="colorBox" style="background-color:var(--darkest)"></div>
		<div class="colorBox" style="background-color:var(--darker)"></div>
		<div class="colorBox main" style="background-color:var(--primary)"></div>
		<div class="colorBox" style="background-color:var(--brighter)"></div>
		<div class="colorBox" style="background-color:var(--brightest)"></div>
		<ColorPicker main={true} index=0/>
	</div>
</div>
{/if}
{#if $menuIndex==1 && $alts.hasOwnProperty('light') && $alts.hasOwnProperty('dark') && $showPaletteLoader==false}
  {#if Object.keys($alts.dark).length && Object.keys($alts.light).length}
    <div in:fly={{y:100,delay:200}}>
      <TestArea {styleVars}/>
    </div>
  {/if}
{/if}
{#if $alts.hasOwnProperty('light') && $alts.hasOwnProperty('dark')}
<Footer {styleVars}/>
{/if}
<PaletteLoader/>
<Modal {styleVars}/>
<style>
	:global(html){
		background-color: var(--bg);
		padding:0;
		margin:0;
    	height: calc(100% - 48px); /* 48px is the height of the sticky footer*/
		max-width:100%;
	}
	:global(body){
		padding:0;
		margin:0;
		width:100%;
		height: calc(100% - 48px); /* 48px is the height of the sticky footer*/
	}
	.palette{
		display:flex;
		height:101%;
		padding:0 20%;
	}
	.colorBox{
		height: 50%;
		display: inline-flex;
		width: 20%;
		align-items: center;
		align-self: center;
		margin: 0px 15px 0px 15px;
		border-radius: 23%;
		box-shadow:0 0 15px 5px rgba(0,0,0,0.5);
	}
	.colorBox.main{
		box-shadow:0 0 15px 5px rgba(220,220,220,0.5);
	}

</style>