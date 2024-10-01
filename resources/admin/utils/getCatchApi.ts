/* eslint-disable prettier/prettier */
import type { ToastProps } from '@admin/components/shared/toast/types';
import { GenericErrorData } from '@admin/consts/generic-error';
import axios from 'axios';
import setShowToast from './setShowToast';

export function GetCatchError({ showToast, error }: { showToast?: (props: ToastProps) => void; error: unknown }) {
    console.error(error)

    if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data

        if (error.response.status === 422) {
            const errors = error.response.data.errors
            const message = Object.keys(errors)
                .map((key) => `${errors[key].join(' ')}`)
                .join('\n')

            if (showToast) {
                setShowToast(showToast, {
                    title: 'Erro de validação.',
                    message,
                    type: 'alert',
                })
            }
            return
        }

        if (showToast) {
            setShowToast(showToast, data ?? GenericErrorData)
            return
        }
    }

    if (showToast) {
        setShowToast(showToast, GenericErrorData)
    }
}
