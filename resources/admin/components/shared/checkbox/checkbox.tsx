import clsx from 'clsx'
import { generateCommonClasses } from '../commonStyles'
import Text from '../text/Text'
import styles from './styles.module.scss'
import type { CheckboxProps } from './types'

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    checked = false,
    error,
    register = () => {},
    required,
    label,
    placeholder,
    onChange,
    ...rest
}) => {
    const classes = clsx(styles.checkboxWrapper, error && styles.errorClass, generateCommonClasses(rest))

    return (
        <div className={classes}>
            {label && <label>{label}</label>}
            <label>
                <input
                    hidden
                    checked={checked}
                    type='checkbox'
                    placeholder={placeholder}
                    {...register(name, { required })}
                    name={name}
                    {...rest}
                    onChange={onChange}
                />
                <div className={styles.boxOuter}>
                    <div className={styles.boxInner} />
                </div>
            </label>
            <Text className={styles.errorMessage}>{error ?? ' '}</Text>
        </div>
    )
}

export default Checkbox
