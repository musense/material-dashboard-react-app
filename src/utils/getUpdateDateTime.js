const getUpdateDateTime = (date) => `
    ${new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric', month: 'long', day: 'numeric'
})} ${new Date(date).toLocaleTimeString('zh-TW', {
    hour: 'numeric', minute: 'numeric', hour12: 'numeric'
})}`;

export default getUpdateDateTime