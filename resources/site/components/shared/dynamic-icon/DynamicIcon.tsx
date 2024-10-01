import * as Iconsax from 'iconsax-react'

interface DynamicIconProps {
    iconName: keyof typeof Iconsax
    size?: number
    color?: string
}

export function DynamicIcon({ iconName, size, color }: DynamicIconProps) {
    const IconComponent = Iconsax[iconName]

    if (!IconComponent) {
        return null
    }

    return <IconComponent size={size} color={color} />
}
