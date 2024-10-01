import { useEffect, useState } from 'react'

import { Link } from '@inertiajs/react'
import IconifyIcon from '../../iconify/IconifyIcon'

import usePath from '@global/hooks/usePath'

import clsx from 'clsx'
import styles from '../styles.module.scss'

type OpenState = Record<string, boolean>

export default function Sidebar() {
    const { location } = usePath()
    const [open, setOpen] = useState<OpenState>({})

    const toggleDropdown = (target: string) => {
        setOpen((prevData: OpenState) => ({
            ...prevData,
            [target]: !prevData[target],
        }))
    }

    useEffect(() => {
        if (location === route('admin.dashboard')) {
            setOpen({})
        }
    }, [location])

    return (
        <aside className={styles.asideDashboard}>
            <div className={styles.asideWrapper}>
                <nav>
                    <Link href={route('admin.dashboard')} title='Voltar para dashboard' className={styles.logoLink}>
                        <img src='/assets/images/brand/logo.svg' alt='Logo' />
                    </Link>

                    <div className={styles.asideLinks}>
                        <div className={styles.group}>
                            <Link
                                href={route('admin.dashboard')}
                                title='Início'
                                className={clsx(
                                    styles.asideLink,
                                    location === route('admin.dashboard') && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:home' />
                                <span>Início</span>
                            </Link>
                        </div>

                        <div className={styles.group}>
                            <div className={styles.asideTopic}>
                                <p className={styles.asidePreview}>--</p>
                                <p className={styles.asideCategory}>Páginas do Site</p>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.page_home ||
                                        location.includes(route('admin.page_home.index')) ||
                                        location.includes(route('admin.banners.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.page_home.index')) ||
                                            (location.includes(route('admin.banners.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('page_home')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Home</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.page_home.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.page_home.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.banners.index')}
                                        title='Banners'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.banners.index')) && styles.active,
                                        )}>
                                        <span>Banners</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.pageAbout ||
                                        location.includes(route('admin.pageAbout.index')) ||
                                        location.includes(route('admin.aboutNumbers.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageAbout.index')) ||
                                            (location.includes(route('admin.aboutNumbers.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('pageAbout')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>A Daico</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageAbout.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageAbout.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.aboutNumbers.index')}
                                        title='Números'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.aboutNumbers.index')) && styles.active,
                                        )}>
                                        <span>Números</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.pageProject ||
                                        location.includes(route('admin.pageProject.index')) ||
                                        location.includes(route('admin.projectMaterials.index')) ||
                                        location.includes(route('admin.projects.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageProject.index')) ||
                                            location.includes(route('admin.projectMaterials.index')) ||
                                            (location.includes(route('admin.projects.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('pageProject')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Projetos</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageProject.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageProject.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.projectMaterials.index')}
                                        title='Padrões'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.projectMaterials.index')) && styles.active,
                                        )}>
                                        <span>Padrões</span>
                                    </Link>

                                    <Link
                                        href={route('admin.projects.index')}
                                        title='Projetos'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.projects.index')) && styles.active,
                                        )}>
                                        <span>Projetos</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.pageBlog ||
                                        location.includes(route('admin.pageBlog.index')) ||
                                        location.includes(route('admin.blogPublications.index')) ||
                                        location.includes(route('admin.blogCategories.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageBlog.index')) ||
                                            location.includes(route('admin.blogPublications.index')) ||
                                            (location.includes(route('admin.blogCategories.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('pageBlog')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Blog</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageBlog.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageBlog.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.blogCategories.index')}
                                        title='Categorias'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.blogCategories.index')) && styles.active,
                                        )}>
                                        <span>Categorias</span>
                                    </Link>

                                    <Link
                                        href={route('admin.blogPublications.index')}
                                        title='Publicações'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.blogPublications.index')) && styles.active,
                                        )}>
                                        <span>Publicações</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.pageMakeProject ||
                                        location.includes(route('admin.pageMakeProject.index')) ||
                                        location.includes(route('admin.units.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        (location.includes(route('admin.pageMakeProject.index')) ||
                                            location.includes(route('admin.units.index'))) &&
                                            styles.active,
                                    )}
                                    onClick={() => toggleDropdown('pageMakeProject')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Faça seu Projeto</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageMakeProject.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageMakeProject.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.units.index')}
                                        title='Unidades'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.units.index')) && styles.active,
                                        )}>
                                        <span>Unidades</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.pageContact ||
                                        location.includes(route('admin.pageContact.represent')) ||
                                        location.includes(route('admin.pageContact.workus')) ||
                                        location.includes(route('admin.pageContact.doubts')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageContact.represent')) ||
                                            location.includes(route('admin.pageContact.workus')) ||
                                            (location.includes(route('admin.pageContact.doubts')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('pageContact')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Contato</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageContact.represent')}
                                        title='Seja Representante'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageContact.represent')) && styles.active,
                                        )}>
                                        <span>Seja Representante</span>
                                    </Link>

                                    <Link
                                        href={route('admin.pageContact.workus')}
                                        title='Trabalhe Conosco'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageContact.workus')) && styles.active,
                                        )}>
                                        <span>Trabalhe Conosco</span>
                                    </Link>

                                    <Link
                                        href={route('admin.pageContact.doubts')}
                                        title='Envie Dúvidas'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageContact.doubts')) && styles.active,
                                        )}>
                                        <span>Envie Dúvidas</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]:
                                        open.depositions ||
                                        location.includes(route('admin.pageShop.index')) ||
                                        location.includes(route('admin.depositions.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageShop.index')) ||
                                            (location.includes(route('admin.depositions.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('depositions')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Seja um Lojista</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageShop.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageShop.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>

                                    <Link
                                        href={route('admin.depositions.index')}
                                        title='Depoimentos'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.depositions.index')) && styles.active,
                                        )}>
                                        <span>Depoimentos</span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={clsx(styles.menuDropdown, {
                                    [styles.open]: open.pageFind || location.includes(route('admin.pageFind.index')),
                                })}>
                                <button
                                    type='button'
                                    className={clsx(
                                        styles.asideLink,
                                        styles.dropdownToggle,
                                        location.includes(route('admin.pageFind.index')) ||
                                            (location.includes(route('admin.depositions.index')) && styles.active),
                                    )}
                                    onClick={() => toggleDropdown('pageFind')}>
                                    <IconifyIcon icon='lucide:newspaper' />
                                    <span>Onde Encontrar</span>

                                    <div className={styles.dropdownIcon}>
                                        <IconifyIcon icon='lucide:chevron-up' />
                                    </div>
                                </button>

                                <div className={`${styles.dropdownContent}`}>
                                    <Link
                                        href={route('admin.pageFind.index')}
                                        title='Conteúdo'
                                        className={clsx(
                                            styles.asideLink,
                                            location.includes(route('admin.pageFind.index')) && styles.active,
                                        )}>
                                        <span>Conteúdo</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={styles.group}>
                            <div className={styles.asideTopic}>
                                <p className={styles.asidePreview}>--</p>
                                <p className={styles.asideCategory}>Leads</p>
                            </div>

                            <Link
                                href={route('admin.leadNews.index')}
                                title='Formulário Novidades'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadNews.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Novidades</span>
                            </Link>

                            <Link
                                href={route('admin.leadProject.index')}
                                title='Formulário Faça seu Projeto'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadProject.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Faça seu Projeto</span>
                            </Link>

                            <Link
                                href={route('admin.leadShop.index')}
                                title='Formulário Seja um Lojista'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadShop.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Seja um Lojista</span>
                            </Link>
                            {/*
                            <Link
                                href={route('admin.leadRepresent.index')}
                                title='Formulário Seja um Representante'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadRepresent.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Seja um Representante</span>
                            </Link> */}

                            <Link
                                href={route('admin.leadWork.index')}
                                title='Formulário Trabalhe Conosco'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadWork.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Trabalhe Conosco</span>
                            </Link>

                            <Link
                                href={route('admin.leadContact.index')}
                                title='Formulário Contato'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.leadContact.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Formulário Contato</span>
                            </Link>
                        </div>

                        <div className={styles.group}>
                            <div className={styles.asideTopic}>
                                <p className={styles.asidePreview}>--</p>
                                <p className={styles.asideCategory}>Configurações</p>
                            </div>

                            <Link
                                href={route('admin.policies.cookies')}
                                title='Política de Cookies'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.policies.cookies')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:cookie' />
                                <span>Política de Cookies</span>
                            </Link>

                            <Link
                                href={route('admin.policies.privacy')}
                                title='Política de Privacidade'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.policies.privacy')) && styles.active,
                                )}>
                                <IconifyIcon icon='ic:outline-privacy-tip' />
                                <span>Política de Privacidade</span>
                            </Link>

                            {/* <Link
                                href={route('admin.policies.terms')}
                                title='Termos de Uso'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.policies.terms')) && styles.active,
                                )}>
                                <IconifyIcon icon='mingcute:paper-line' />
                                <span>Termos de Uso</span>
                            </Link> */}

                            <Link
                                href={route('admin.contact_info.index')}
                                title='Informações de contato'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.contact_info.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:phone' />
                                <span>Informações de contato</span>
                            </Link>

                            <Link
                                href={route('admin.admins.index')}
                                title='Usuários gestores'
                                className={clsx(
                                    styles.asideLink,
                                    location.includes(route('admin.admins.index')) && styles.active,
                                )}>
                                <IconifyIcon icon='lucide:users-round' />
                                <span>Usuários gestores</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
