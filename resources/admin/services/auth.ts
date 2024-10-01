import { router } from '@inertiajs/react'
import { api } from '@global/services/api'
import { toast } from 'react-toastify'

export async function Logout() {
    toast.loading('Realizando logout', {
        autoClose: 2000,
    })
    const response = await api.post(route('dashboard.sendLogout'))

    if (response.status === 200) {
        return setTimeout(() => {
            router.visit(route('dashboard.login'))
        }, 2000)
    }
}

export async function AdminLogout() {
    toast.loading('Realizando logout', {
        autoClose: 2000,
    })
    const response = await api.post(route('admin.sendLogout'))

    if (response.status === 200) {
        return setTimeout(() => {
            router.visit(route('admin.login'))
        }, 2000)
    }
}
