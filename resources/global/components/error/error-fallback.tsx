import clsx from 'clsx'
import styles from './styles.module.scss'

interface IProps {
    error: string
    type?: 'text-center' | 'text-absolute-center'
    tryAgain?: boolean
}

export default function ErrorFallback({ error, type = 'text-center' }: IProps) {
    return (
        <div className={clsx(styles.wrapper, styles[type])}>
            <p className={styles.error}>{error}</p>
        </div>
    )
}
