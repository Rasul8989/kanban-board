export const MAX_AVATAR_SIZE = 1024 * 1024


export function readAvatarFile(file: File, onLoad: (dataUrl: string) => void) {
    if (file.size > MAX_AVATAR_SIZE) {
        alert('Photo is too big (max 1 MB)')
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            onLoad(reader.result)
        }
    }
    reader.readAsDataURL(file)
}