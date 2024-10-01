const getIconName = (icon: string): string => {
    return icon
        .split('-')
        .map((word) => {
            const firstLetter = word.charAt(0).toUpperCase()
            const restOfWord = word.slice(1).toLowerCase().replace(/[0-9]/g, '')
            return `${firstLetter}${restOfWord}`
        })
        .join('')
}

export default getIconName
