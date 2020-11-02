import { writable,derived, readable } from 'svelte/store';
import * as ColorLib from 'color';
const Color = ColorLib.default;

export const randomPrimaryColor = (algo="tako")=>{
    if(algo=="tako") return Math.floor(Math.random() * (230 - 150 + 1)) + 150;
    if(algo="unified") return Math.floor(Math.random() * (200 - 150 + 1)) + 150;
    if(algo="shades") return Math.floor(Math.random() * (120 - 150 + 1)) + 150;
}
let newRGB = [randomPrimaryColor(),randomPrimaryColor(),randomPrimaryColor()];
export const showSaveModal = writable(false);
export const showPaletteLoader = writable(false);
export const savedPalettes = writable([]);
export const menuIndex = writable(1);
export const rgb = writable([156, 211, 159]);
export const saturation = writable(0);
export const brightness = writable(0);
export const hue = writable(0);
export const alts = writable({})
export const config = writable({});
export const scheme = writable("light");
export const algo = writable("unified");
export const algolist = readable(["tako","unified","shades"]);
export const palette = derived([rgb,algo],([$rgb,$algo])=>{
    if($algo=="unified"){
        return GenerateUnifiedColors($rgb);
    }
    if($algo=="tako"){
        return GenerateTakoColors2($rgb);
    }
    if($algo=="shades"){
        return GenerateShadesColor($rgb);
    }
});
export const gradients = derived(palette,($palette)=>{
    return {
        dark:{
            primary:   GenerateGradient($palette.dark.primaryDarker,$palette.dark.primary,135),
            darkest:   GenerateGradient($palette.dark.darker,$palette.dark.darkest,135),
            darker:    GenerateGradient($palette.dark.primaryDarker,$palette.dark.darker,135),
            brighter:  GenerateGradient($palette.dark.primary,$palette.dark.brighter,135),
            brightest: GenerateGradient($palette.dark.brighter,$palette.dark.brightest,135),
            radial:    GenerateRadialGradient($palette.dark.darkest,$palette.dark.darker,$palette.dark.primary,$palette.dark.brighter,$palette.dark.brightest)
        },
        light:{
            primary:   GenerateGradient($palette.light.primaryBrighter,$palette.light.primary,-45),
            darkest:   GenerateGradient($palette.light.darker,$palette.light.darkest,-45),
            darker:    GenerateGradient($palette.light.primaryDarker,$palette.light.darker,-45),
            brighter:  GenerateGradient($palette.light.primary,$palette.light.brighter,-45),
            brightest: GenerateGradient($palette.light.brighter,$palette.light.brightest,-45),
            radial:    GenerateRadialGradient($palette.light.darkest,$palette.light.darker,$palette.light.primary,$palette.light.brighter,$palette.light.brightest)
        }
    }
})
export function GenerateShadesColor(primary){
    primary = Color.rgb(primary).saturationl(50).rgb().array();
    return {
        dark:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0.1).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.1).rgb().array(),
            darkest:Color.rgb(primary).darken(0.75).desaturate(0.8).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.85).desaturate(0.8).rgb().array(),
            darker:Color.rgb(primary).darken(0.5).desaturate(0.5).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.65).desaturate(0.5).rgb().array(),
            brighter:Color.rgb(primary).lighten(0.1).desaturate(0.2).rgb().array(),
            brighterBrighter:Color.rgb(primary).lighten(0.2).desaturate(0.2).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.25).desaturate(0.3).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.35).desaturate(0.3).rgb().array()
        },
        light:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0.2).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.2).rgb().array(),
            darkest:Color.rgb(primary).darken(0.75).desaturate(0.8).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.85).desaturate(0.8).rgb().array(),
            darker:Color.rgb(primary).darken(0.65).desaturate(0.5).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.75).desaturate(0.5).rgb().array(),
            brighter:Color.rgb(primary).lighten(0.1).rgb().array(),
            brighterBrighter:Color.rgb(primary).lighten(0.2).desaturate(0.2).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.3).desaturate(0.8).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.4).desaturate(0.8).rgb().array()
        }
    }
}
export function GenerateTakoColors2(primary){
    return {
        dark:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.2).rgb().array(),
            darkest:Color.rgb(primary).darken(0.75).desaturate(0.8).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.85).desaturate(0.8).rgb().array(),
            darker:Color.rgb(primary).darken(0.5).desaturate(0.5).rotate(65*1.618).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.65).desaturate(0.5).rotate(65*1.618).rgb().array(),
            brighter:Color.rgb(primary).lighten(0.1).desaturate(0.2).rotate(160*1.618).rgb().array(),
            brighterBrighter:Color.rgb(primary).lighten(0.25).desaturate(0.2).rotate(160*1.618).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.15).saturate(0.8).rotate(270*1.618).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.25).saturate(0.8).rotate(270*1.618).rgb().array()
        },
        light:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0.2).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.2).rgb().array(),
            darkest:Color.rgb(primary).darken(0.75).desaturate(0.8).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.85).desaturate(0.8).rgb().array(),
            darker:Color.rgb(primary).darken(0.65).desaturate(0.5).rotate(120).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.75).desaturate(0.5).rotate(120).rgb().array(),
            brighter:Color.rgb(primary).darken(0.1).rotate(180*1.618).rgb().array(),
            brighterBrighter:Color.rgb(primary).darken(0.2).desaturate(0.2).rotate(180*1.618).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.1).desaturate(0.8).rotate(270*1.618).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.2).desaturate(0.8).rotate(270*1.618).rgb().array()
        }
    }
}
export function GenerateUnifiedColors(primary){
    let colorToMix = Color.rgb(primary).rotate(180).saturate(0.5);
    let mixedColor = Color.rgb(primary).mix(colorToMix);
    return {
        dark:{
            primary:mixedColor.saturationl(50).rgb().array(), /* Primary */
            primaryBrighter:mixedColor.lighten(0.33).saturationl(40).rgb().array(), /* Primary Brighter */
            primaryDarker:mixedColor.darken(0.33).saturationl(40).rgb().array(), /* Primary Darker */
            darkest:mixedColor.saturationl(10).lightness(20).rgb().array(), /* Darkest */
            darkestDarker:mixedColor.saturationl(5).lightness(10).rgb().array(), /* DarkestDarker */
            darker:mixedColor.saturationl(20).lightness(30).rotate(45).rgb().array(), /* Darker */
            darkerDarker:mixedColor.saturationl(15).lightness(20).rotate(45).rgb().array(), /* DarkerDarker */
            brighter:mixedColor.saturationv(40).lightness(60).rotate(277).rgb().array(), /* Brighter */
            brighterBrighter:mixedColor.saturationv(40).lightness(70).rotate(277).rgb().array(), /* BrighterBrighter */
            brightest:mixedColor.saturationv(30).lighten(0.5).rgb().array(), /* Brightest */
            brightestBrighter:mixedColor.saturationl(30).lighten(0.5).rgb().array() /* BrightestBrighter */
        },
        light:{
            primary:mixedColor.saturationl(50).rgb().array(), /* Primary */
            primaryBrighter:mixedColor.lighten(0.33).saturationl(40).rgb().array(), /* Primary Brighter */
            primaryDarker:mixedColor.darken(0.33).saturationl(40).rgb().array(), /* Primary Darker */
            darkest:mixedColor.saturationl(10).lightness(20).rgb().array(), /* Darkest */
            darkestDarker:mixedColor.saturationl(5).lightness(10).rgb().array(), /* DarkestDarker */
            darker:mixedColor.saturationl(20).darken(0.1).rotate(45).rgb().array(), /* Darker */
            darkerDarker:mixedColor.saturationl(15).darken(0.2).rotate(45).rgb().array(), /* DarkerDarker */
            brighter:mixedColor.saturationv(40).lighten(0.3).rotate(277).rgb().array(), /* Brighter */
            brighterBrighter:mixedColor.saturationv(40).lighten(0.4).rotate(277).rgb().array(), /* BrighterBrighter */
            brightest:mixedColor.saturationv(30).lighten(0.4).rgb().array(), /* Brightest */
            brightestBrighter:mixedColor.saturationl(30).lighten(0.5).rgb().array() /* BrightestBrighter */
        }
    }
}
export function GenerateTakoColors(primary){
    return {
        dark:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0.2).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.2).rgb().array(),
            darkest:Color.rgb(primary).darken(0.75).desaturate(0.8).rotate(0*1.618).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.85).desaturate(0.8).rotate(0*1.618).rgb().array(),
            darker:Color.rgb(primary).darken(0.5).desaturate(0.5).rotate(45*1.618).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.65).desaturate(0.5).rotate(45*1.618).rgb().array(),
            brighter:Color.rgb(primary).lighten(0.1).desaturate(0.2).rotate(180*1.618).rgb().array(),
            brighterBrighter:Color.rgb(primary).lighten(0.25).desaturate(0.2).rotate(180*1.618).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.15).saturate(0.8).rotate(270*1.618).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.25).saturate(0.8).rotate(270*1.618).rgb().array()
        },
        light:{
            primary:primary,
            primaryBrighter:Color.rgb(primary).lighten(0.2).rgb().array(),
            primaryDarker:Color.rgb(primary).darken(0.2).rgb().array(),
            darkest:Color.rgb(primary).darken(0.85).desaturate(0.8).rotate(0*1.618*Math.PI).rgb().array(),
            darkestDarker:Color.rgb(primary).darken(0.95).desaturate(0.8).rotate(45*1.618*Math.PI).rgb().array(),
            darker:Color.rgb(primary).darken(0.65).desaturate(0.5).rotate(120).rgb().array(),
            darkerDarker:Color.rgb(primary).darken(0.75).desaturate(0.5).rotate(120).rgb().array(),
            brighter:Color.rgb(primary).darken(0.1).rotate(180*1.618).rgb().array(),
            brighterBrighter:Color.rgb(primary).darken(0.2).desaturate(0.2).rotate(180*1.618).rgb().array(),
            brightest:Color.rgb(primary).lighten(0.4).desaturate(0.8).rotate(270*1.618).rgb().array(),
            brightestBrighter:Color.rgb(primary).lighten(0.5).desaturate(0.8).rotate(270*1.618).rgb().array()
        }
    }
}
export function GenerateGradient(from,to,angle){
    return `-webkit-linear-gradient(${angle}deg,${Color(from).rgb().string()} 0%,${Color(from).mix(Color(to),0.081).rgb().string()} 8.1%,${Color(from).mix(Color(to),0.155).rgb().string()} 15.5%,${Color(from).mix(Color(to),0.225).rgb().string()} 22.5%, ${Color(from).mix(Color(to),0.29).rgb().string()} 29%,${Color(from).mix(Color(to),0.353).rgb().string()} 35.3%,${Color(from).mix(Color(to),0.412).rgb().string()} 41.2%,${Color(from).mix(Color(to),0.471).rgb().string()} 47.1%, ${Color(from).mix(Color(to),0.529).rgb().string()} 52.9%,${Color(from).mix(Color(to),0.588).rgb().string()} 58.8%,${Color(from).mix(Color(to),0.647).rgb().string()} 64.7%,${Color(from).mix(Color(to),0.71).rgb().string()} 71%,${Color(from).mix(Color(to),0.775).rgb().string()} 77.5%,${Color(from).mix(Color(to),0.845).rgb().string()} 84.5%,${Color(from).mix(Color(to),0.919).rgb().string()} 91.9%,${Color(to).rgb().string()} 100%)`;
}
export function GenerateRadialGradient(darkest,darker,primary,brighter,brightest){
    return `radial-gradient(circle, ${Color(darkest).rgb().string()} 25%, ${Color(darker).rgb().string()} 25%, ${Color(darker).rgb().string()} 50%, ${Color(brighter).rgb().string()} 50%, ${Color(brighter).rgb().string()} 75%, ${Color(brightest).rgb().string()} 75%, ${Color(brightest).rgb().string()} 100%)`
}