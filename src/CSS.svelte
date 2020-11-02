<script>
    import cssVars from 'svelte-css-vars';
    import Prism from 'prismjs';
    import * as ColorLib from 'color';
    const Color = ColorLib.default;
    export let vars;
    export let theme;
    import {afterUpdate, onMount} from 'svelte';
    import {scheme, palette,alts} from './store';
    
    let themeArr = ($scheme=='dark') ? ['dark','light'] : ['light','dark'];
    $: CSS = (theme=="main") ? `
    @media (prefers-color-scheme: ${themeArr[0]}){
        :root{
            --primary: ${Color.rgb($palette[themeArr[0]].primary).string()};
            --secondary: ${Color.rgb($palette[themeArr[0]].brighter).string()};
            --tertiary: ${Color.rgb($palette[themeArr[0]].brightest).string()};
            --darker: ${Color.rgb($palette[themeArr[0]].darker).string()};
            --darkest: ${Color.rgb($palette[themeArr[0]].darkest).string()};
        }
    }
    ` :
    `
    @media (prefers-color-scheme: ${themeArr[1]}){
        :root{
            --primary: ${Color.rgb($palette[themeArr[1]].primary).string()};
            --secondary: ${Color.rgb($palette[themeArr[1]].brighter).string()};
            --tertiary: ${Color.rgb($palette[themeArr[1]].brightest).string()};
            --darker: ${Color.rgb($palette[themeArr[1]].darker).string()};
            --darkest: ${Color.rgb($palette[themeArr[1]].darkest).string()};
        }
    }
    `;
    $: PrismHTML = Prism.highlight(CSS,Prism.languages.css);
    afterUpdate(()=>{
        PrismHTML = Prism.highlight(CSS,Prism.languages.css);
    });
    onMount(()=>{
        PrismHTML = Prism.highlight(CSS,Prism.languages.css);
    })
</script>

{#if Object.keys(vars).length}
<div use:cssVars={vars}>
    <pre class='language-css'><code class='language-css'>
        {@html PrismHTML}
    </code></pre>
</div>
{/if}
<style>
    @media (prefers-color-scheme: dark){
        /**
        * okaidia theme for JavaScript, CSS and HTML
        * Loosely based on Monokai textmate theme by http://www.monokai.nl/
        * @author ocodia
        */
        :global(code[class*="language-"],
        pre[class*="language-"]) {
            color: var(--brighter);
            background: none;
            text-shadow: 0 1px rgba(0, 0, 0, 0.3);
            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            font-size: 1em;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;

            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;

            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
        }

        /* Code blocks */
        :global(pre[class*="language-"]) {
            padding: 1em;
            margin: .5em 0;
            overflow: auto;
            border-radius: 0.3em;
            background-color:var(--darkest);
        }

        :global(:not(pre) > code[class*="language-"],
        pre[class*="language-"]) {
            background: var(--darkest) !important;
        }

        /* Inline code */
        :not(pre) > code[class*="language-"] {
            padding: .1em;
            border-radius: .3em;
            white-space: normal;
        }

        :global(.token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata) {
            color: #8292a2;
        }

        :global(.token.punctuation) {
            color: #f8f8f2;
        }

        :global(.token.namespace) {
            opacity: .7;
        }

        :global(.token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted) {
            color: var(--primary) !important;
        }

        .token.boolean,
        .token.number {
            color: #ae81ff;
        }

        :global(.token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted) {
            color: var(--brighterBrighter) !important;
        }

        :global(.token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable) {
            color: var(--brighter) !important;
        }

        :global(.token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name) {
            color: var(--brightest) !important;
        }

        :global(.token.keyword) {
            color: #66d9ef;
        }

        :global(.token.regex,
        .token.important) {
            color: #fd971f;
        }

        :global(.token.important,
        .token.bold) {
            font-weight: bold;
        }
        :global(.token.italic) {
            font-style: italic;
        }

        .token.entity {
            cursor: help;
        }
    }
    @media (prefers-color-scheme:light){
            /**
        * okaidia theme for JavaScript, CSS and HTML
        * Loosely based on Monokai textmate theme by http://www.monokai.nl/
        * @author ocodia
        */
        :global(code[class*="language-"],
        pre[class*="language-"]) {
            color: var(--darker);
            background: none;
            text-shadow: 0 1px rgba(0, 0, 0, 0.3);
            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            font-size: 1em;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;

            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;

            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
        }

        /* Code blocks */
        :global(pre[class*="language-"]) {
            padding: 1em;
            margin: .5em 0;
            overflow: auto;
            border-radius: 0.3em;
        }

        :global(:not(pre) > code[class*="language-"],
        pre[class*="language-"]) {
            background: var(--brightest) !important;
        }

        /* Inline code */
        :not(pre) > code[class*="language-"] {
            padding: .1em;
            border-radius: .3em;
            white-space: normal;
        }

        :global(.token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata) {
            color: #8292a2;
        }

        :global(.token.punctuation) {
            color: var(--darkest);
        }

        :global(.token.namespace) {
            opacity: .7;
        }

        :global(.token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted) {
            color: var(--primaryDarker) !important;
        }

        .token.boolean,
        .token.number {
            color: var(--darker);
        }

        :global(.token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted) {
            color: var(--brighter) !important;
        }

        :global(.token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable) {
            color: var(--darker) !important;
        }

        :global(.token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name) {
            color: var(--darkest) !important;
        }

        :global(.token.keyword) {
            color: #66d9ef;
        }

        :global(.token.regex,
        .token.important) {
            color: #fd971f;
        }

        :global(.token.important,
        .token.bold) {
            font-weight: bold;
        }
        :global(.token.italic) {
            font-style: italic;
        }

        .token.entity {
            cursor: help;
        }
    }
</style>