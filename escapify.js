const to_replace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
const get_replacement = (ch) => to_replace[ch];

export const escape = (content) => {
    return content.replace(/[&<>"']/g, get_replacement);
}


export const escapify = (query_selector='pre') => {
    let flagged;
    let lmnt;

    flagged = document.querySelectorAll(query_selector);

    // Iterate over the flagged code HTML elements
    for (let i = 0; lmnt = flagged[i++];) {
        lmnt.innerHTML = escape(lmnt.innerHTML);
    }
}
