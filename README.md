# nanolight
Extremely lightweight, language agnostic code syntax highlighting for your front end app. Compatible with anything, including Tailwind CSS and Svelte.

# Usage
```javascript
// Node JS
import { highlight } from "$lib/nanolight";
highlight('pre code'); // Use any CSS query to select what elements to highlight dynamically

// Vanilla JS
// WARNING, you have to use the "vanilla" version of the script if running directly in a browser.
<script type="text/javascript" src="./nanolight-vanilla.js"></script>
<script type="text/javascript">
   window.onload = () => {
       console.time('SyntaxHighlight')
       highlight('pre code');
       console.timeEnd('SyntaxHighlight')
   }
</script>

// Optional: Add lines to your code (see demo)
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

// See demo for example output
```

# Customizing the style
Nanolight exposes CSS classes so you can specify your custom CSS. Try it by copy pasting the below:

```CSS
/* Keywords */
.nanolight-keywords {
    /* Tailwind */
    /* @apply font-fira-code antialiased tracking-widest text-[#feca57] */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.1em;
    color: #feca57;
    font-variant-ligatures: common;
    text-shadow:
        0 0 9px #feca57,
        0 0 2px #feca57,
        0 0 21px #feca57,
        0 0 102px #feca57;
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
    /* @apply font-fira-code opacity-100 antialiased text-[#c8d6e5] */
    font-family: 'Fira Code', monospace;
    opacity: 1;
    -webkit-font-smoothing: antialiased;
    color: #c8d6e5;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #ecf0f1b9,
        0 0 3px #ecf0f1c7,
        0 0 21px #ecf0f1a2;
}

/* Comments */
.nanolight-comments {
    /* Tailwind */
    /* @apply font-fira-code opacity-100 italic antialiased text-[#4cd137] */
    font-family: 'Fira Code', monospace;
    opacity: 1;
    font-style: italic;
    -webkit-font-smoothing: antialiased;
    color: #4cd137;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #4cd137,
        0 0 3px #4cd137,
        0 0 21px #4cd137;
}

/* Line numbers */
.nanolight-line-numbers {
    /* Tailwind */
    /* @apply font-fira-code antialiased text-[#BDC3C7] text-sm inline */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    color: #BDC3C7;
    font-size: 0.875rem;
    display: inline;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #BDC3C7,
        0 0 3px #BDC3C7;
}

/* Any code that doesn't fall into the above categories*/
.nanolight-normal {
    /* Tailwind */
    /* @apply font-fira-code antialiased text-sm md:text-base text-[#ff9ff3] */
    font-family: 'Fira Code', monospace;
    -webkit-font-smoothing: antialiased;
    font-size: 0.875rem;
    color: #ff9ff3;
    font-variant-ligatures: common;
    text-shadow:
        0 0 7px #ff9ff3,
        0 0 3px #ff9ff3;
}

@media (min-width: 768px) {
    .nanolight-normal {
        font-size: 1rem;
    }
}

```
