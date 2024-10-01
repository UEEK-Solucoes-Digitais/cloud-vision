import { useSearchParams } from '@admin/hooks/useSearchParams'
import { useState } from 'react'

import LoginForm from '@admin/components/pages/auth/login/LoginForm'
import RecoveryForm from '@admin/components/pages/auth/recovery/RecoveryForm'

import clsx from 'clsx'

import styles from '../page.module.scss'

type formTypes = 1 | 2 | 3

export default function Form() {
    const searchParams = useSearchParams()
    const recovery = searchParams.get('recovery')
    const [activeForm, setActiveForm] = useState<formTypes>(!recovery ? 1 : 3)

    const classes = clsx(styles.formWrapper)

    return (
        <div className={classes}>
            {activeForm === 1 && (
                <LoginForm show={activeForm === 1} setShow={setActiveForm} className={styles[`form-${activeForm}`]} />
            )}

            {activeForm === 2 && (
                <RecoveryForm
                    show={activeForm === 2}
                    setShow={setActiveForm}
                    className={styles[`form-${activeForm}`]}
                />
            )}

            {/* {activeForm === 3 && (
                <NewPasswordForm
                    show={activeForm === 3}
                    setShow={setActiveForm}
                    className={styles[`form-${activeForm}`]}
                />
            )} */}
        </div>
    )
}
