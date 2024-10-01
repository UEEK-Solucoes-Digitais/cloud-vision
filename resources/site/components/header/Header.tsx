import { useState, useEffect, useCallback } from 'react'
import { useResize } from '@global/hooks/useResize'
export default function Header() {
    const windowSize = useResize()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
    }, [])

    const toggleMenu = () => {
        setMenuOpen((state) => !state)
    }

    useEffect(() => {
        const handleScroll = () => {
            // Verifica se a página foi rolada mais do que 50 pixels
            setScrolled(window.scrollY > 50)
        }

        // Adiciona o ouvinte de evento ao scroll
        window.addEventListener('scroll', handleScroll)

        // Limpa o ouvinte quando o componente é desmontado
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (windowSize?.width && windowSize.width >= 1200) {
            closeMenu()
        }

        if (menuOpen) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }

        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [menuOpen, windowSize?.width, closeMenu])

    return <header>oi</header>
}
