export function getPath(full?: boolean) {
    let fullLocation = ''
    let currentLocation = ''
    let pathArray: string[] = []
    if (typeof window !== 'undefined') {
        fullLocation = window.location.href
        currentLocation = window.location.pathname
        pathArray = currentLocation.split('/')
    }

    if (full) {
        return fullLocation
    }

    return pathArray.length > 1 ? pathArray[1] : ''
}
