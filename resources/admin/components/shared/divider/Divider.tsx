import styles from './styles.module.scss'

const Divider = ({ weight }: { weight: number }) => {
    return <div className={styles.divider} style={{ height: `${weight}px` }} />
}

export default Divider
