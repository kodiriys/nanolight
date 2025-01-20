// Created by Suhayl Kodiriy
const add_lines = (content) => {
    // Adds line number to code block
    let lines = content.split('\n').length;
    let linified = content;
    for (let i = 0; i < lines; i++) {
        linified = linified.replace(/\n/, `<~~br~~hubbabubba>` + `${i + 1} `.padStart(4, ' '));
    }
    return linified.replaceAll('<~~br~~hubbabubba>', '\n');
}

const linify = (query_selector='.line-numbers') => {
    let flagged;
    let lmnt;

    flagged = document.querySelectorAll(query_selector);

    // Iterate over the flagged code HTML elements
    for (let i = 0; lmnt = flagged[i++];) {
        let lined_content = '<br>' + add_lines(lmnt.innerHTML);
        lmnt.innerHTML = lined_content.trimStart();
    }
}
