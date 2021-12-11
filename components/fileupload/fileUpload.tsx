import React, { useState } from 'react'
import type { NextPage } from 'next'

interface FileUpload {
    placeholder: string
    extensions: Array<string>
}
interface FileInfo {
    extension: string
    size: number
    fileName: string
}

const FileUpload: NextPage<FileUpload> = ({ placeholder, extensions }) => {
    /*Manage blob*/
    const [file, setFile] = useState<any>({})
    const [blob, setBlob] = useState<any>()
    /*File info set in state*/
    const [fileInfo, setFileInfo] = useState<FileInfo>()
    const [preview, setPreview] = useState(false)
    const previewFile = async () => {
        const blob = URL.createObjectURL(file.get('file'))
        setBlob(blob)
        setPreview(!preview)
    }
    const deleteFile = () => {
        if (preview) {
            setPreview(false)
            setBlob({})
        }
        setFile({})
        setFileInfo(undefined)
    }
    const checkExtension = (file: File): { ext: string; correct: boolean } => {
        const ext: string = file.type.split('/')[1]
        const correctExt = extensions.filter(e =>
            ext.includes(e) ? true : false
        )
        return correctExt.length > 0
            ? { ext, correct: true }
            : { ext, correct: false }
    }
    const checkImgName = (name: string, ext: string): string => {
        const splitedName = name.split('.')
        const formattedName = `${Date.now()}${splitedName[0].replace(
            /\s/g,
            ''
        )}.${ext}`
        return formattedName
    }
    const onChangeHandler = (e: any) => {
        if (e.target.files) {
            if (file) deleteFile()
            const files: Array<File> = e.target.files
            files.length > 1 && console.error('Cant upload more than 1 file')
            const uploadedFile = files[0]
            const { ext, correct: hasCorrectExt } = checkExtension(uploadedFile)
            if (hasCorrectExt) {
                const formattedName = checkImgName(uploadedFile.name, ext)
                const data = new FormData()
                data.append('file', uploadedFile, formattedName)
                setFileInfo({
                    fileName: formattedName,
                    extension: ext,
                    size: uploadedFile.size
                })
                setFile(data)
            } else {
                console.error('Incorrect extension!!')
            }
        }
    }
    return (
        <div className="form-control ml-4">
            <label
                className="w-64 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase
                cursor-pointer
                hover:bg-purple-600 hover:text-white
                text-purple-600
                ease-linear
                transition-all
                duration-150
                border border-blue
                                                    "
            >
                <span className="text-base leading-normal">{placeholder}</span>

                <input
                    type="file"
                    onChange={onChangeHandler}
                    className="hidden"
                />
            </label>
            {fileInfo?.fileName && (
                <>
                    <span>{fileInfo?.fileName}</span>
                    <span onClick={previewFile}>Preview</span>
                    <span onClick={deleteFile}>Delete</span>
                </>
            )}
            {preview && <iframe className="h-screen w-full" src={`${blob}`} />}
        </div>
    )
}

export default FileUpload
