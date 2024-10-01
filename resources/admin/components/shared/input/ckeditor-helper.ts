import type { Editor } from '@ckeditor/ckeditor5-core'
import type { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload'

export class MyUploadAdapter implements UploadAdapter {
    private loader: FileLoader
    private url: string
    private xhr: XMLHttpRequest | null
    private csrfToken: string | null

    constructor(loader: FileLoader) {
        this.loader = loader
        this.url = route('media.upload')
        this.csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
        this.xhr = null
    }

    async upload(): Promise<{ default: string }> {
        return this.loader.file.then(
            (file: File | null) =>
                new Promise<{ default: string }>((resolve, reject) => {
                    if (file) {
                        this._initRequest()
                        this._initListeners(resolve, reject, file)
                        this._sendRequest(file)
                    } else {
                        reject(new Error('Nenhum arquivo encontrado.'))
                    }
                }),
        )
    }

    abort(): void {
        if (this.xhr) {
            this.xhr.abort()
        }
    }

    private _initRequest(): void {
        const xhr = (this.xhr = new XMLHttpRequest())
        xhr.open('POST', this.url, true)
        xhr.responseType = 'json'
        if (this.csrfToken) {
            xhr.setRequestHeader('X-CSRF-TOKEN', this.csrfToken)
        }
    }

    private _initListeners(
        resolve: (value: { default: string }) => void,
        reject: (reason?: any) => void,
        file: File,
    ): void {
        const xhr = this.xhr!
        const loader = this.loader
        const genericErrorText = `Não foi possível fazer o upload do arquivo: ${file.name}.`

        xhr.addEventListener('error', () => reject(genericErrorText))
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if (!response || response.error) {
                return reject(response?.error ? response.error.message : genericErrorText)
            }
            resolve({
                default: response.url,
            })
        })

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', (evt) => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total
                    loader.uploaded = evt.loaded
                }
            })
        }
    }

    private _sendRequest(file: File): void {
        const data = new FormData()
        data.append('upload', file)
        this.xhr!.send(data)
    }
}

export function MyCustomUploadAdapterPlugin(editor: Editor): void {
    (editor.plugins.get('FileRepository') as any).createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader)
    }
}
