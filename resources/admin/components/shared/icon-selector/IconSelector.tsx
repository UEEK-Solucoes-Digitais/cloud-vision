// import { Isaxicons } from '@admin/types/models/Isax'
// import getIconName from '@admin/utils/getIconName'
// import { DynamicIcon } from '@admin/views/site/dynamic-icon/DynamicIcon'
// import clsx from 'clsx'
// import * as Iconsax from 'iconsax-react'
// import { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react'
// import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
// import Input from '../input/Input'
// import Text from '../text/Text'
// import styles from './styles.module.scss'

// interface IconSelectorProps extends HTMLAttributes<HTMLDivElement> {
//     selectedIcon: string
//     text?: string
//     register: UseFormRegister<any>
//     error?: string
//     setValue: UseFormSetValue<any>
//     name: string
// }

// export default function IconSelector({
//     selectedIcon,
//     text = 'Ícone',
//     register,
//     error,
//     setValue,
//     name,
// }: IconSelectorProps) {
//     const [icon, setIcon] = useState(selectedIcon) // || 'activity'
//     const [isOpen, setIsOpen] = useState(false)
//     const [search, setSearchIcon] = useState('')

//     // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//     useEffect(() => {
//         if (!isOpen) {
//             setSearchIcon('')
//         }
//     }, [isOpen, search])

//     // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//     useEffect(() => {
//         if (typeof setValue === 'function') {
//             setValue(name, icon)
//         }
//     }, [])

//     const iconFilter = Isaxicons.filter((item) => search === '' || (search !== '' && item.includes(search)))

//     return (
//         <div className={styles.iconSelectorWrapper}>
//             <label>{text}</label>
//             <div className={styles.iconSelectorDiv}>
//                 <button
//                     type='button'
//                     className={clsx(styles.toggleSelector, isOpen && styles.active)}
//                     onClick={() => setIsOpen(!isOpen)}>
//                     <DynamicIcon iconName={getIconName(icon ?? '') as keyof typeof Iconsax} size={22} color='#000000' />
//                 </button>

//                 {isOpen && (
//                     <div className={styles.iconSelector}>
//                         <Input
//                             defaultValue={search}
//                             required={false}
//                             name='search'
//                             type='text'
//                             register={register}
//                             placeholder='Pesquisar ícone (em inglês)'
//                             onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//                                 setSearchIcon(e.target.value)
//                             }
//                         />

//                         <div className={styles.iconSelectorGrid}>
//                             {iconFilter.length === 0 && <span className={styles.message}>Nenhum ícone encontrado</span>}

//                             {iconFilter.map((iconLoop, index) => (
//                                 <button
//                                     key={`icon-${index + 1}`}
//                                     type='button'
//                                     data-icon={iconLoop}
//                                     data-active={iconLoop === icon}
//                                     title={iconLoop}
//                                     onClick={() => {
//                                         setIcon(iconLoop)
//                                         setIsOpen(false)
//                                         setValue(name, iconLoop)
//                                     }}>
//                                     {Iconsax[getIconName(iconLoop ?? '') as keyof typeof Iconsax] && (
//                                         <DynamicIcon
//                                             iconName={getIconName(iconLoop ?? '') as keyof typeof Iconsax}
//                                             size={22}
//                                             color='#000000'
//                                         />
//                                     )}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <Text className={styles.errorMessage}>{error ?? ' '}</Text>
//         </div>
//     )
// }
