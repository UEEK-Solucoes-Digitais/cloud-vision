import globalStyles from './global.module.scss'
import { CommonProps } from './globals'

const commonPropToClassName: Record<keyof CommonProps, string> = {
    radius: 'radius',
    m: 'margin',
    mt: 'margin-top',
    mb: 'margin-bottom',
    ms: 'margin-start',
    me: 'margin-end',
    mx: 'margin-horizontal',
    my: 'margin-vertical',
    p: 'padding',
    pt: 'padding-top',
    pb: 'padding-bottom',
    ps: 'padding-start',
    pe: 'padding-end',
    px: 'padding-horizontal',
    py: 'padding-vertical',
}

export const generateCommonClasses = (props: CommonProps) => {
    const classes = []

    for (const prop in props) {
        if (props[prop as keyof CommonProps]) {
            const className =
                globalStyles[`${commonPropToClassName[prop as keyof CommonProps]}-${props[prop as keyof CommonProps]}`]

            if (className) {
                classes.push(className)
            }
        }
    }

    return classes.join(' ')
}
