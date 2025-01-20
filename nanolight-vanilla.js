/* CREATED BY SUHAYL KODIRIY 2023-01-04

HEAVILY INSPIRED BY MICROLIGHT LIBRARY: http://github.com/asvd/microlight
*/

/* Highlight and add line numbers to code */
const classes = new Map()
    // 0: not formatted
    .set(0, 'nanolight-normal')
    // 1: keywords
    .set(1, 'nanolight-keywords')
    // 2: punctuation
    .set(2, 'nanolight-punctuation')
    // 3: strings and regexps
    .set(3, 'nanolight-strex')
    // 4: comments
    .set(4, 'nanolight-comments')
    // 5: line numbers
    .set(5, 'nanolight-line-numbers')
;

// Change this to export const for Node JS, or remove the "export" for Vanilla JS running directly in browser.
const highlight = (query_selector=null) => {
    if (!document) {
        return;
    }
    let flagged;
    let lmnt;

    if (query_selector)
        flagged = document.querySelectorAll(query_selector || '.nanolight');
    else
        flagged = document.querySelectorAll('pre code');

    // Iterate over the flagged code HTML elements
    for (let i = 0; lmnt = flagged[i++];) {
        let text         = lmnt.textContent; // Full text of code element
        let pos          = 0;                // current position
        let next_char    = text[pos];        // next character
        let current_char = 1;                // current character
        let previous_char;                   // previous character
        let previous_char_2;                 // the one before the previous
        let token = lmnt.innerHTML = '';     // (and cleaning the node)

        // current token type:
        //  0: anything else (whitespaces / newlines)
        //  1: operator or brace
        //  2: closing braces (after which '/' is division not regex)
        //  3: (key)word
        //  4: regex
        //  5: string starting with "
        //  6: string starting with '
        //  7: xml comment  <!-- -->
        //  8: multiline comment /* */
        //  9: single-line comment starting with two slashes //
        // 10: single-line comment starting with hash #
        // 11: line numbers
        let token_type = 0;

        // kept to determine between regex and division
        let last_token_type;
        // flag determining if token is multi-character
        let is_multi_char;
        let node;

        // running through characters and highlighting
        // escaping if needed (with except for comments)
        // pervious character will not be therefore
        // recognized as a token finalize condition
        while (previous_char_2 = previous_char,
            previous_char = token_type < 7 && previous_char == '\\' ? 1 : current_char
        ) {
            current_char  = next_char;
            next_char     = text[++pos];
            is_multi_char = token.length > 1;

            // MAP of Token Type conditionals
            const end_token_conditional = new Map()
                // Token Type == 0: Whitespaces
                .set(0, /\S/.test(current_char) )
                // Token Type == 1: Operators, may consist of multiple characters
                .set(1, !/[\/{}[(\-+*=<>:;|\\.,?!&@~]+/.test(current_char) )
                // Token Type == 2: Braces
                .set(2, 1 )
                // Token Type == 3: Keywords
                .set(3, !/[$\w]/.test(current_char) )
                // Token Type == 4: Regular Expressions
                .set(4, (previous_char == '/' || previous_char == '\n') && is_multi_char )
                // Token Type == 5: Strings (delimited by quotation marks)
                .set(5, previous_char == '"' && is_multi_char )
                // Token Type == 6: Strings (delimited by apostrophes)
                .set(6, previous_char == "'" && is_multi_char )
                // Token Type == 7: XML comments
                .set(7, text[pos - 4] + previous_char_2 + previous_char == '-->' )
                // Token Type == 8: Block comments
                .set(8, previous_char_2 + previous_char == '*/' )
                // Token Type == 9: Comment (single line) (comments end with a newline)
                .set(9, current_char == '\n' )
                // Token Type == 10: Comment (single line) (comments end with a newline)
                .set(10, current_char == '\n' )
                // Token Type == 11: Line number
                .set(11, !/\n?[\d]+\s/.test(previous_char+current_char+next_char+text[pos+1]+text[pos+2]) )
            ;

            const token_type_to_class = new Map()
                .set(0, 0)
                .set(null, 0)
                .set(false, 0)
                .set(1, 2)
                .set(2, 2)
                // 1 if regex matches, otherwise 0. The plus is there to cast to an int
                .set(3, + /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/.test(token) )
                .set(4, 3)
                .set(5, 3)
                .set(6, 3)
                .set(7, 4)
                .set(8, 4)
                .set(9, 4)
                .set(10, 4)
                .set(11, 5)
            ;

            // checking if we reached the end of current token
            // and if current token should be processed
            // note: end of content means current char is null
            if ( !current_char || end_token_conditional.get(token_type) ) {
                // appending the token to the result
                if (token) {
                    // If it's a line number, don't create a span but a custom div
                    // so that we can do text alignment
                    // if (token_type == 11) {
                    //     console.log(token);
                    //     lmnt.appendChild(
                    //         node = document.createElement('div')
                    //     ).classList.add(classes.get(
                    //             token_type_to_class.get(token_type)
                    //         )
                    //     );
                    //     node.appendChild(document.createTextNode(token));
                    // } else {
                        // remapping token type into style
                        // (some types are highlighted similarly)
                        lmnt.appendChild(
                            node = document.createElement('span')
                        ).classList.add(classes.get(
                                token_type_to_class.get(token_type)
                            )
                        );
                        node.appendChild(document.createTextNode(token));
                    // }
                }

                // saving the previous token type
                // (skipping whitespaces and comments)
                last_token_type =
                    (token_type && token_type < 7) ?
                    token_type : last_token_type;

                // initializing a new token
                token = '';

                // determining the new token type (going up the
                // list until matching a token type start
                // condition)
                token_type = 12;

                const start_token_conditional = new Map()
                    //  0: whitespace
                    .set(0, 1)
                    //  1: operator or braces
                    .set(1, /[\/{}[(\-+*=<>:;|\\.,?!&@~]+/.test(current_char) )
                    //  2: closing brace
                    .set(2, /[\])]/.test(current_char) )
                    //  3: (key)word
                    .set(3, /[$\w]/.test(current_char) )
                    //  4: regex
                    .set(4, current_char == '/' &&
                        // previous token was an
                        // opening brace or an
                        // operator (otherwise
                        // division, not a regex)
                        (last_token_type < 2) &&
                        // workaround for xml
                        // closing tags
                        previous_char != '<' )
                    //  5: string with "
                    .set(5, current_char == '"' )
                    //  6: string with '
                    .set(6, current_char == "'")
                    //  7: xml comment
                    .set(7, current_char+next_char+text[pos+1]+text[pos+2] == '<!--' )
                    //  8: multiline comment
                    .set(8, current_char+next_char == '/*' )
                    //  9: single-line comment
                    .set(9, current_char+next_char == '//' )
                    // 10: hash-style comment
                    .set(10, current_char == '#' )
                    // 11: line number
                    .set(11, /\n?[\d]+\s/.test(previous_char+current_char+next_char+text[pos+1]+text[pos+2]) )
                ;

                while (!start_token_conditional.get(--token_type) );
            }

            token += current_char;
        }
    }
}
