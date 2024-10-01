import styles from './styles.module.scss'
import spinner from '@admin/assets/spinner.svg'

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <img className={styles.spinner} src={spinner} alt='Ícone de carregamento' />
        </div>
    )
}

export default Loading
