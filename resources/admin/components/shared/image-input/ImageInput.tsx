import ImagePath from '@global/consts/ImagePath'
import clsx from 'clsx'
import type React from 'react'
import { useEffect, useState, type ComponentProps } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import Fancybox from '../fancybox/fancybox'
import IconifyIcon from '../iconify/IconifyIcon'
import Text from '../text/Text'
import styles from './styles.module.scss'

interface ImageInputProps extends ComponentProps<'input'> {
    register?: UseFormRegister<any>
    variant?: string
    label?: string
    required: boolean
    name: string
    error?: string
    preview?: string
    multiple?: boolean
    imagesGallery?: any[]
    onChangeGallery?: (e: React.ChangeEvent<HTMLInputElement>) => void
    removeimageFunction?: (image: any) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    accept?: string
    fitContent?: boolean
}

const ImageInput: React.FC<ImageInputProps> = ({
    preview,
    label,
    error,
    variant,
    required,
    register,
    name,
    multiple = false,
    imagesGallery = [],
    onChangeGallery,
    removeimageFunction,
    onChange,
    fitContent = false,
    accept = 'image/png, image/jpeg, image/svg, image/webp',
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imagesGalleryPreview, setImagesGalleryPreview] = useState<any[] | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (multiple) {
            onChangeGallery ? onChangeGallery(e) : <></>
        } else {
            const file = e.target.files?.[0]

            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setImagePreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (imagesGallery.length > 0 && multiple) {
            const fileReadPromises = imagesGallery.map((image, index) => {
                return new Promise<{ index: number; data: string | ArrayBuffer | null }>((resolve, reject) => {
                    if (!image.id) {
                        const reader = new FileReader()

                        reader.onloadend = () => {
                            resolve({ index, data: reader.result })
                        }

                        reader.onerror = reject

                        reader.readAsDataURL(image)
                    } else {
                        resolve({ index, data: null })
                    }
                })
            })

            Promise.all(fileReadPromises).then((results) => {
                const images = results
                    .filter((result) => result.data !== null)
                    .reduce<string[]>((acc, curr) => {
                        acc[curr.index] = curr.data as string
                        return acc
                    }, [])
                setImagesGalleryPreview(images)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesGallery])

    function handleRemoveImage(image: any) {
        if (removeimageFunction) {
            if (image.id) {
                if (
                    confirm(
                        'Deseja realmente remover essa imagem? Ela já está no banco de dados e será removida do site',
                    )
                ) {
                    removeimageFunction(image)
                }
            } else {
                removeimageFunction(image)
            }
        }
    }

    const classes = clsx(styles.imageContainer, error && styles.errorClass, variant && styles[variant])

    return (
        <div className={classes} style={{ width: fitContent ? 'fit-content' : 'auto' }}>
            {label && (
                <label className={styles.imageLabel} htmlFor={name} style={{ cursor: 'pointer' }}>
                    {label}
                </label>
            )}

            <div className={styles.galleryWrapper}>
                <label htmlFor={name} className={styles.imageWrapper}>
                    <input
                        type='file'
                        multiple={multiple}
                        hidden
                        accept={accept}
                        id={name}
                        {...register?.(name, {
                            required,
                            onChange: (e) => {
                                handleImageChange(e)

                                if (onChange) {
                                    onChange(e)
                                }
                            },
                        })}
                    />

                    <div className={`${styles.imagePreview} ${imagePreview || preview ? styles.withImage : ''}`}>
                        {!multiple &&
                            (imagePreview ? (
                                <>
                                    {accept.includes('video') ? (
                                        <video
                                            className={styles.imageItem}
                                            src={imagePreview}
                                            height='100%'
                                            width='100%'
                                            controls
                                            autoPlay={false}
                                        />
                                    ) : (
                                        <img
                                            className={styles.imageItem}
                                            src={imagePreview}
                                            alt='Imagem'
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    )}
                                </>
                            ) : (
                                preview && (
                                    <>
                                        {accept.includes('video') ? (
                                            <video
                                                className={styles.imageItem}
                                                src={preview}
                                                height='100%'
                                                width='100%'
                                                controls
                                                autoPlay={false}
                                            />
                                        ) : (
                                            <img
                                                className={styles.imageItem}
                                                src={preview}
                                                alt='Imagem'
                                                loading='lazy'
                                                decoding='async'
                                            />
                                        )}
                                    </>
                                )
                            ))}
                    </div>
                </label>

                {multiple && (
                    <Fancybox>
                        <div className={styles.previewGallery}>
                            {imagesGallery.map((image, index) => (
                                <div key={`image-${index + 1}`} className={styles.galleryPreviewWrapper}>
                                    <button
                                        type='button'
                                        className={styles.removeImageButton}
                                        title='Remover imagem'
                                        onClick={() => handleRemoveImage(image)}>
                                        <IconifyIcon icon='lucide:trash' />
                                    </button>
                                    <a
                                        data-fancybox={`galeria-${name}`}
                                        href={`${
                                            image.id
                                                ? `${ImagePath.UPLOADS}${image.image}`
                                                : imagesGalleryPreview?.[index]
                                                  ? imagesGalleryPreview[index]
                                                  : ''
                                        }`}>
                                        <img
                                            key={`gallery-${name}-${index + 1}`}
                                            className={styles.imageItem}
                                            src={`${
                                                image.id
                                                    ? `${ImagePath.UPLOADS}${image.image}`
                                                    : imagesGalleryPreview?.[index]
                                                      ? imagesGalleryPreview[index]
                                                      : ''
                                            }`}
                                            alt='Imagem'
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </Fancybox>
                )}
            </div>

            <Text className={styles.errorMessage}>{error ?? ' '}</Text>
        </div>
    )
}

export default ImageInput
