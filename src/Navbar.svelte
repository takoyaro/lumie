<script>
    import {menuIndex,scheme} from './store.js';
    import cssVars from 'svelte-css-vars';

    export let styleVars;

    </script>

    <div use:cssVars={styleVars}>
        <nav class="{$scheme}">
            <li class:active={$menuIndex==0} on:click={()=>{menuIndex.set(0);console.log($menuIndex)}}>LUMIE</li>
            <li class:active={$menuIndex==1} on:click={()=>{menuIndex.set(1);console.log($menuIndex)}}>Preview</li>
        </nav>
    </div>
    
    <style>
        nav{
            height: 48px;
            width: 100%;
            justify-content: center;
            display: flex;
            align-items: center;
            position: fixed;
            background-color: white;
            z-index: 1;
            box-shadow: 0 5px 5px rgba(0,0,0,0.1);
        }
        nav li{
            padding:0px 15px;
            font-size:1.3em;
            font-family: 'Spartan';
            text-transform:uppercase;
            background-color: var(--bg-darker);
            height:100%;
            display: inline-flex;
            place-items: center;
            flex-direction: row;
            flex-flow: row;
            flex-grow: 100;
            user-select:none;
            color: var(--bg-brightest);
            transition:300ms;
        }
        nav li:first-of-type{
            flex-flow: row-reverse;
        }
        nav li.active{
            box-shadow: inset 0 -5px var(--primary);
        }
        nav li:hover{
            text-decoration:none;
            font-size:1.4em;
            transition:300ms;
            box-shadow: inset 0 -5px var(--brighter);
        }
        nav.dark{
            background-color:var(--darkest);
            color:var(--primary);
        }
    </style>