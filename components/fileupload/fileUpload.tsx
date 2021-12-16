import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { firebaseManager } from '../../services/firebase.services'
import { SignUpStore } from '../../store/sigup.store'
interface FileUpload {
    placeholder: string
    extensions: Array<string>
    type: string
    readonly?: boolean
    optionalParams?: any
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
    optionalParams = []
}) => {
    const state = SignUpStore.useState(s => s)
    /*Manage blob*/
    const [file, setFile] = useState<any>({})
    const [blob, setBlob] = useState<any>()
    /*File info set in state*/
    const [fileInfo, setFileInfo] = useState<any>()
    const [preview, setPreview] = useState(false)
    const [deleted, setDeleted] = useState(false)
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
        console.log(fileInfo)
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
    const deleteFile = () => {
        if (fileInfo?.fileName || optionalParams.length > 0) {
            if (preview) {
                setPreview(false)
                setBlob({})
            }
            setFile({})
            setFileInfo(undefined)
            firebaseManager
                .deleteFile(fileInfo?.fileName)
                .then(snapshot => {
                    setDeleted(true)
                    SignUpStore.update(s => {
                        switch (type) {
                            case 'cuitDestinatario':
                                s.datosEmpresa.destinatarioFactura.cuit.constancia =
                                    ''
                                break
                            case 'cuit':
                                s.datosEmpresa.cuit.constancia = ''
                                break
                            case 'iibb':
                                s.datosEmpresa.iibb.constancia = ''
                                break
                            case 'razonSocial':
                                s.datosEmpresa.razonSocial.constancia = ''
                                break
                            default:
                                console.error('Incorrect type')
                                break
                        }
                    })
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
                    SignUpStore.update(s => {
                        switch (type) {
                            case 'cuitDestinatario':
                                s.datosEmpresa.destinatarioFactura.cuit.constancia =
                                    snapshot.metadata.fullPath
                                break
                            case 'cuit':
                                s.datosEmpresa.cuit.constancia =
                                    snapshot.metadata.fullPath
                                break
                            case 'iibb':
                                s.datosEmpresa.iibb.constancia =
                                    snapshot.metadata.fullPath
                                break
                            case 'razonSocial':
                                s.datosEmpresa.razonSocial.constancia =
                                    snapshot.metadata.fullPath
                                break
                            default:
                                console.error('Incorrect type')
                                break
                        }
                    })
                })
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
                    readOnly={readonly}
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
