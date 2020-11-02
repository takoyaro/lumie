<script>
    import {menuIndex} from './store.js';
    import cssVars from 'svelte-css-vars';

    export let styleVars;

    </script>
    
    <nav use:cssVars={styleVars}>
        <li class:active={$menuIndex==0} on:click={()=>{menuIndex.set(0);console.log($menuIndex)}}>LUMIE</li>
        <li class:active={$menuIndex==1} on:click={()=>{menuIndex.set(1);console.log($menuIndex)}}>Preview</li>
    </nav>
    
    <style>
        nav{
            height: 48px;
            width: 100%;
            justify-content: center;
            display: flex;
            align-items: center;
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
    </style>