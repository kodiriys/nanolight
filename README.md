# nanolight
Extremely lightweight, language agnostic code syntax highlighting for your front end app. Compatible with anything, including Tailwind CSS and Svelte.

# Usage with Node
```javascript
// Node JS
import { highlight } from "$lib/nanolight";
highlight('pre code'); // Use any CSS query to select what elements to highlight dynamically
```

# Usage outside Node
Use the "vanilla" version of the script if running directly in a browser.
```html
<link rel="stylesheet" href="./nanolight.css">
<script type="text/javascript" src="./nanolight-vanilla.js"></script>
<script type="text/javascript">
   window.onload = () => {
       console.time('SyntaxHighlight')
       highlight('pre code');
       console.timeEnd('SyntaxHighlight')
   }
</script>
```

## Optional: Add lines to your code (see demo)
```html
<link rel="stylesheet" href="./nanolight.css">
<script type="text/javascript" src="./nanolight-vanilla.js"></script>
<script type="text/javascript" src="./linify-vanilla.js"></script>
<script type="text/javascript" src="./escapify-vanilla.js"></script>
<script type="text/javascript">
    window.onload = () => {
       console.time('Escaping HTML took');
       escapify('pre code');
       console.timeEnd('Escaping HTML took');

       console.time('Adding line numbers took');
       linify('.line-numbers');
       console.timeEnd('Adding line numbers took');

       console.time('Syntax highlighting took');
       highlight('pre code');
       console.timeEnd('Syntax highlighting took');

    }
</script>
```

# Customizing the style
Nanolight exposes CSS classes for customization. (See demo for working example.)

```CSS
/* NANOLIGHT CONFIGURATION */

/* Keywords */
.nanolight-keywords {
    /* Tailwind */
    /* @apply font-fira-code antialiased tracking-widest text-[#feca57] */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.1em;
    color: #6c5ce7;
    font-variant-ligatures: common;
    text-shadow:
        0 0 9px #6c5ce7,
        0 0 2px #6c5ce7,
        0 0 21px #6c5ce7,
        0 0 102px #6c5ce7;
}

/* Punctuation */
.nanolight-punctuation {
    /* Tailwind */
    /* @apply font-fira-code antialiased text-[#48dbfb] */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    color: #48dbfb;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #48dbfb,
        0 0 3px #48dbfb;
}

/* Strings and regular expressions */
.nanolight-strex {
    /* Tailwind */
    /* @apply font-fira-code opacity-100 antialiased text-[#4cd137] */
    font-family: 'Fira Code', monospace;
    opacity: 1;
    -webkit-font-smoothing: antialiased;
    color: #4cd137;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #4cd137,
        0 0 3px #4cd137,
        0 0 21px #4cd137;
}

/* Comments */
.nanolight-comments {
    /* Tailwind */
    /* @apply font-fira-code opacity-100 italic antialiased text-[#b2bec3] */
    font-family: 'Fira Code', monospace;
    opacity: 0.5;
    font-style: italic;
    -webkit-font-smoothing: antialiased;
    color: #b2bec3;
    font-variant-ligatures: common;
    /* text-shadow:
        0 0 7px #b2bec3,
        0 0 3px #b2bec3,
        0 0 21px #b2bec3; */
}

/* Line numbers */
.nanolight-line-numbers {
    /* Tailwind */
    /* @apply font-fira-code antialiased text-[#ffd32a] text-sm inline */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    color: #ffd32a;
    font-size: 0.875rem;
    display: inline;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #ffd32a,
        0 0 3px #ffd32a;
}

/* Any code that doesn't fall into the above categories*/
.nanolight-normal {
    /* Tailwind */
    /* @apply font-fira-code antialiased text-sm md:text-base text-[#dcdde1] */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    font-size: 0.875rem;
    color: #dcdde1;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #dcdde1,
        0 0 3px #dcdde1;
}

@media (min-width: 768px) {
    .nanolight-normal {
        font-size: 1rem;
    }

    pre code {
        font-size: 1rem;
    }
}


```
