
export const formatResultSearch = (text, query) => {
    const reg = new RegExp(`(${query})`, 'gi');
    return text.replace(reg, `<strong class="highlight">$1</strong>`)
}