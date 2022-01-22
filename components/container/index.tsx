import { useRouter } from 'next/router'
import React from 'react'
import Icon from '../../components/icon'

interface Props {
    children: any
}

const Component = (props: Props): JSX.Element => {
    const router = useRouter()

    const goTo = (to: string) => {
        router.push(to)
    }

    const ItemMenu = (props: {
        name: string
        navigateTo: string
        className?: string
    }) => {
        return (
            <div
                className={`cursor-pointer ml-4 ${props.className}`}
                onClick={() => goTo(props.navigateTo)}
            >
                {props.name}
            </div>
        )
    }

    return (
        <div className="flex">
            <div className="drawer-side  text-white bg-neutral">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu py-3 ">
                    <li>
                        <a>
                            <Icon type={'DOWNLOAD'} stroke={2} size={24} />
                            <ItemMenu
                                name="Bandeja de entrada"
                                navigateTo={'/process'}
                            />
                        </a>
                    </li>
                    <li>
                        <a>
                            <Icon type={'UPLOAD'} stroke={2} size={24} />
                            <ItemMenu
                                name="Bandeja de salida"
                                navigateTo={'/outbox'}
                            />
                        </a>
                    </li>
                    <li>
                        <a>
                            <Icon type={'PLANNING'} stroke={2} size={24} />
                            <ItemMenu
                                name="Planificacion"
                                navigateTo={'/planning'}
                            />
                        </a>
                    </li>
                    <li>
                        <div tabIndex={0} className="collapse   collapse-arrow">
                            <div className="collapse-title  font-medium">
                                <div className="flex">
                                    <Icon
                                        type={'SETTING'}
                                        color="white"
                                        size={24}
                                        stroke={2}
                                    />
                                    <div className="ml-2">Settings</div>
                                </div>
                            </div>
                            <div className="collapse-content">
                                <ItemMenu
                                    name="Workflow"
                                    className="ml-2"
                                    navigateTo={'/settings/workflow'}
                                />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="mx-4 mt-4 h-screen">{props.children}</div>
        </div>
    )
}

export default Component
