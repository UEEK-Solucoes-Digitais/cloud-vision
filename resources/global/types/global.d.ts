// import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js'
import { route as routeFn } from '@/services/ziggy'
import { AxiosInstance } from 'axios'

declare global {
    interface Window {
        axios: AxiosInstance
    }

    var route: typeof routeFn

    // var route: typeof ziggyRoute
    // let Ziggy: ZiggyConfig

    const appName = import.meta.env.VITE_APP_NAME
}
