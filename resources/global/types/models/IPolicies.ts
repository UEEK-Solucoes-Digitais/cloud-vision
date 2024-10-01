// eslint-disable-next-line no-unused-vars
type IPolicies<TPrefix extends string> = {
    [K in `${TPrefix}_seo_title` | `${TPrefix}_seo_description` | `${TPrefix}_title` | `${TPrefix}_text`]: string
}

export type IPrivacy = IPolicies<'privacy'>
export type ICookies = IPolicies<'cookies'>
export type ITerms = IPolicies<'terms'>
