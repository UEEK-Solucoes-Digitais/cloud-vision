export default function usePath() {
    const location = window.location.href
    const fullname = window.location.pathname
    const paths = fullname.split('/')

    return { location, fullname, paths } as const
}
