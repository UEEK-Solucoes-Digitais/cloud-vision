export default interface IBanner {
    id: number
    title: string
    description: string
    image: string
    image_webp: string
    image_mobile: string
    image_mobile_webp: string
    btn_text: string
    btn_link: string
    position: number
    status: number
    created_at: Date
    updated_at: Date
}
