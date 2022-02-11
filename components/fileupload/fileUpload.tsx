import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { firebaseManager } from '../../services/firebase.services'
import { SignUpStore } from '../../store/sigup.store'
import Icon from '../../components/icon'

interface FileUpload {
    placeholder?: string
    extensions: Array<string>
    type: string
    readonly?: boolean
    optionalParams?: any
    showFullScreen?: boolean
    key?: string
    onChange?: any
}

interface FileInfo {
    extension: string
    size: number
    fileName: string
}

const FileUpload: NextPage<FileUpload> = ({
    placeholder,
    extensions,
    type,
    readonly = false,
    optionalParams = [],
    showFullScreen = false,
    key = '',
    onChange = () => void null
}) => {
    const state = SignUpStore.useState(s => s)
    /*Manage blob*/
    const [file, setFile] = useState<any>(null)
    const [blob, setBlob] = useState<any>()
    /*File info set in state*/
    const [fileInfo, setFileInfo] = useState<any>()
    const [preview, setPreview] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [processingFile, setProcessingFile] = useState(false)

    const FullScreenComponent = () => {
        if (preview)
            return (
                <div className="indicator w-full">
                    <div
                        className="indicator-item bg-white p-2 rounded-full cursor-pointer border"
                        onClick={async () => {
                            await deleteFile()
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="red"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>

                    <iframe className="h-screen w-full" src={`${blob}`} />
                </div>
            )
        return (
            <div className="hero min-h-screen bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Archivo adjunto
                        </h1>
                        <p className="mb-5">
                            Por favor, haga click en Subir Archivo para poder
                            adjuntar el archivo pdf al expediente
                        </p>
                        <label
                            className="w-64 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase
                                cursor-pointer
                                hover:bg-purple-600 hover:text-white
                                text-purple-600
                                ease-linear
                                transition-all
                                duration-150
                                border border-blue"
                        >
                            Subir archivo
                            <input
                                type="file"
                                readOnly={readonly}
                                onChange={async e => {
                                    await onChangeHandler(e)
                                    await previewFile()
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>
        )
    }

    const FileInputComponent = () => {
        return (
            <div className="form-control ml-4">
                <div className="flex">
                    <label
                        className=" flex  items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase
                        cursor-pointer
                        hover:bg-purple-600 hover:text-white
                        text-purple-600
                        ease-linear
                        transition-all
                        duration-150
                        border border-blue
                                                "
                    >
                        <span className="text-base leading-normal">
                            {placeholder}
                        </span>

                        <div className="flex">
                            {processingFile && (
                                <button className="btn loading btn-ghost"></button>
                            )}
                            <input
                                type="file"
                                readOnly={readonly}
                                onChange={onChangeHandler}
                                className="hidden"
                            />
                        </div>
                    </label>
                    {fileInfo?.fileName && (
                        <div className="ml-2">
                            <div
                                onClick={previewFile}
                                className="cursor-pointer"
                            >
                                <Icon type={'EXPAND'} stroke={1} />
                            </div>

                            <div
                                onClick={deleteFile}
                                className="cursor-pointer"
                            >
                                <Icon type={'REMOVE'} stroke={1} color="red" />
                            </div>
                        </div>
                    )}
                </div>
                {preview && (
                    <div className="my-6 indicator w-full">
                        <div className="indicator-item  ">
                            <button
                                className="btn btn-error"
                                onClick={() => setPreview(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                        <iframe
                            className="h-screen w-full pt-4"
                            src={`${blob}`}
                        />
                    </div>
                )}
            </div>
        )
    }

    useEffect(() => {
        if (optionalParams.length > 0 && !deleted) {
            setFileInfo({
                extension: optionalParams[0].extension,
                size: optionalParams[0].size,
                fileName: optionalParams[0].name
            })
        }
    }, [optionalParams])

    const previewFile = async () => {
        let blob
        if (optionalParams.length > 0) {
            const url = await firebaseManager.getFileUrl(
                optionalParams[0].fullPath
            )
            blob = url
        } else {
            blob = URL.createObjectURL(file.get('file'))
        }
        setBlob(blob)
        setPreview(!preview)
    }
    const deleteFile = async () => {
        if (fileInfo?.fileName || optionalParams.length > 0) {
            if (preview) {
                setPreview(false)
                setBlob({})
            }
            setFile({})
            setFileInfo(undefined)
            await firebaseManager
                .deleteFile(fileInfo?.fileName)
                .then(snapshot => {
                    setDeleted(true)
                    onChange(null)
                    setProcessingFile(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
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
            setProcessingFile(true)
            if (file) deleteFile()
            const files: Array<File> = e.target.files
            files.length > 1 && console.error('Cant upload more than 1 file')
            const uploadedFile = files[0]
            const { ext, correct: hasCorrectExt } = checkExtension(uploadedFile)
            if (hasCorrectExt) {
                const formattedName = checkImgName(uploadedFile.name, ext)
                const data = new FormData()
                data.append('file', uploadedFile, formattedName)

                firebaseManager.uploadFile(data.get('file')).then(snapshot => {
                    setFileInfo({
                        fileName: formattedName,
                        extension: ext,
                        size: uploadedFile.size
                    })
                    setFile(data)
                    onChange(snapshot.metadata.fullPath)
                    setProcessingFile(false)
                })
            } else {
                console.error('Incorrect extension!!')
            }
        }
    }
    return (
        <div key={`fileUpload${key}`}>
            {showFullScreen ? <FullScreenComponent /> : <FileInputComponent />}
        </div>
    )
}

export default FileUpload
