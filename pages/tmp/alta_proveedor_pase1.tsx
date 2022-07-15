import type { NextPage } from 'next'

const Page: NextPage = () => {
    return (
        <div>
            {/*--HEADER--*/}
            <div class="border-slate-200 border-b-2 p-4 px-8 flex flex-row items-center">
                <div class="basis-1/2">
                    <img
                        src="../logos/SantaFe_Marca_blanco.png"
                        class="float-left pr-4"
                    />
                    <h4 class="font-bold text-base">
                        Ministerio de Gestión Publica
                    </h4>
                    <p class="text-xs text-slate-500">
                        Secretaría de Comunicación Social
                    </p>
                    <p class="text-xs text-slate-500">
                        Dirección General de Publicitaria y Administrativa
                    </p>
                </div>
                <div class="basis-1/2 text-right">
                    <h4 class="font-bold text-base ">
                        Santa Fe,
                        <br /> "Cuna de la Constitución Nacional"
                    </h4>
                </div>
            </div>
            {/*--SUB HEADER--*/}
            <div class=" p-4 px-8  text-xs  text-slate-600">
                <div class=" text-right">
                    <div>
                        Fecha:<strong class="ml-2">12/12/2020</strong>
                    </div>
                </div>
            </div>
            {/*--BODY--*/}
            <div class=" p-4  text-xs px-8  mb-4 text-slate-600">
                <h4 class="font-bold mb-4">
                    Señor Gerente o Administrador de:
                </h4>
                <p>
                    Sírvase ordenar la publicación del texto cuyo original se
                    acompaña de acuerdo con la tarifa de ese medio, registrada
                    y/u oficializada ante organismos provinciales, ajustándose a
                    las modalidades que a continuación se detallan:
                </p>
            </div>
            <h4 class="font-bold mb-2 text-base text-base mx-8">
                Firma y Pase
            </h4>
            <div class=" bg-slate-100  p-4 rounded-lg text-xs mx-8  text-slate-600">
                <p>
                    Oberservaciones:
                    <strong class="ml-3">
                        Sírvase ordenar la publicación del texto cuyo original
                        se acompaña de acuerdo con la tarifa de ese medio,
                        registrada y/u oficializada ante organismos
                        provinciales, ajustándose a las modalidades que a
                        continuación se detallan:
                    </strong>
                </p>
            </div>
            <div class="border-slate-200 border-t p-4 px-8 grid grid-cols-3 w-full gap-4 items-center absolute bottom-0 text-center">
                <div></div>
                <div class="uppercase font-bold text-sm">Original</div>
                <div></div>
            </div>
        </div>
    )
}

export default Page
