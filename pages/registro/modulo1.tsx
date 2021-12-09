import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import { businessService } from '../../services/business.service'

const Page: NextPage = () => {
  const router = useRouter()
  const state = SignUpStore.useState(s => s)
  const [loading, setLoading] = useState(false)


  return (
    <div>
      <section className="py-20 flex h-screen ">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center prose">
            <div className="max-w-md mb-8 mx-auto">
              <span className="text-sm text-blueGray-400">
                Registro General Rosario
              </span>
              <h1>Modulo N 1 Dominio</h1>
            </div>
            <div>
              <div className="prose">

                <div className="mb-4">
                  <div className="form-control">
                    <input
                      type="text"

                      placeholder="Acto y monto"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="max-w-md mb-8 mx-auto">
                  <span className="text-sm text-blueGray-400">
                    Tratandose de fraccion/es de una mayor area inscripta,determinar:
                  </span>

                </div>

                <div className="mb-2 flex ">
                  <div className="form-control w-full">
                    <input
                      type="text"

                      placeholder="Lote"
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control ml-4 w-full ">
                    <input
                      type="text"

                      placeholder="Manzana"
                      className="input input-bordered"
                    />

                  </div>
                  <div className="form-control ml-4 w-full ">
                    <input
                      type="text"

                      placeholder="Plano"
                      className="input input-bordered"
                    />

                  </div>

                </div>



                <div className="mb-4 ">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Lote/s</th>
                          <th>Manzana</th>
                          <th>Plano N /año</th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td></td>
                          <td></td>

                        </tr>

                      </tbody>
                    </table>
                  </div>



                </div>

                <section>

                  <h3>2. Datos de inscripcion</h3>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <label className="cursor-pointer label">
                        <span className="label-text">Dominio</span>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                    <div className="form-control w-full">
                      <label className="cursor-pointer label">
                        <span className="label-text">Propiedad Horizontal</span>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Departamento"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Matricula"
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <div className="mb-2 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Tomo"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"

                        placeholder="Folio"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"

                        placeholder="Numero"
                        className="input input-bordered"
                      />

                    </div>

                  </div>



                  <div className="mb-4 ">
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th>Tomo</th>
                            <th>Folio</th>
                            <th>Numero</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td></td>
                            <td></td>

                          </tr>

                        </tbody>
                      </table>
                    </div>



                  </div>
                </section>

                <section>
                  <h3>3. Datos de Inmueble segun titulo inscripto</h3>

                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Ubicacion / Distrito"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Zona"
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Localidad"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Calle y Nro"
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <div className="mb-4 ">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="Entre calles"
                        className="input input-bordered"
                      />
                    </div>

                  </div>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Lote"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"

                        placeholder="Manzana"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"

                        placeholder="Superficie"
                        className="input input-bordered"
                      />

                    </div>


                  </div>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Plano nro / año"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"

                        placeholder="Arranque"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">

                    </div>


                  </div>

                  <div className="max-w-md mb-8 mx-auto">
                    <span className="text-sm text-blueGray-400">
                      Rumbos, medidas lineales y linderos (adaptar las iniciales a los rumbos si no coinciden con las aqui previstas)
                    </span>

                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="N "
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="S"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"
                        placeholder="E"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="O"
                        className="input input-bordered"
                      />
                    </div>
                  </div>

                  <div className="max-w-md mb-8 mx-auto">
                    <span className="text-sm text-blueGray-400">
                      Cuando es propiedad horizontal
                    </span>


                  </div>

                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Unidad"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Parcela/s"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Ubicada en planta/s"
                        className="input input-bordered"
                      />

                    </div>


                  </div>

                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Superficies (m2)"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Comun"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Valor Proporcional"
                        className="input input-bordered"
                      />

                    </div>


                  </div>




                </section>

                <section>


                  <h3>4. Titular/es  de dominio segun titulo inscripto</h3>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <label className="cursor-pointer label">
                        <span className="label-text">Persona Humana</span>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                    <div className="form-control w-full">
                      <label className="cursor-pointer label">
                        <span className="label-text">Persona Juridica</span>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Apellido"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Tipo Doc"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Nro de Doc"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="CUIL/CUIT/CDI"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Fraccion"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Denominacion"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Tipo"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Cuit"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Fraccion"
                        className="input input-bordered"
                      />
                    </div>
                  </div>



                  <div className="mb-4 ">
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr>
                            <th>Denominacion</th>
                            <th>Tipo</th>
                            <th>Cuit</th>
                            <th>Fraccion</th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td></td>
                            <td></td>

                          </tr>

                        </tbody>
                      </table>
                    </div>



                  </div>
                </section>

                <section>


                  <h3>5. Solicitante</h3>
                  <div className="mb-4 ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Solicitante"
                        className="input input-bordered"
                      />
                    </div>

                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Registro Nro"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Localidad"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Provincia"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">
                      <input
                        type="text"
                        placeholder="Domicilio"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Telefono"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control w-full ml-4">

                    </div>

                  </div>


                </section>
                <section>


                  <h3>6. Se agregan</h3>

                  <div className="mb-4 ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Anexos continuando rubro S/n"
                        className="input input-bordered"
                      />
                    </div>

                  </div>


                </section>
                <section>

                  <h3>7. Observaciones</h3>
                  <div className="mb-4 ">
                    <div className="form-control w-full">
                      <textarea className="textarea h-24 textarea-bordered" placeholder="Otros Datos, enmiendas,etc"></textarea>

                    </div>
                    <div className="form-control w-full ">
                      <label
                        className=" mt-3  w-64  flex flex-col  items-center px-4  py-3    bg-white  rounded-md shadow-md tracking-wide  uppercase
                                   border border-blue  cursor-pointerhover:bg-purple-600 hover:text-white  text-purple-600ease-linear transition-all   duration-150  "
                      >
                        <i className="fas fa-cloud-upload-alt fa-3x"></i>
                        <span className="text-base leading-normal">
                          Firmar digitalmente
                        </span>
                        <input
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>

                  </div>



                </section>
                <div className="max-w-md mb-8 mt-4 mx-auto">

                  <h1>Para uso exclusivo del registro</h1>
                </div>
                <section>

                  <h3>8. No puede despacharse la solicitud por causa de:</h3>
                  <div className="mb-4 ">
                    <div className="form-control w-full">
                      <textarea className="textarea h-24 textarea-bordered" placeholder="Otros Datos, enmiendas,etc"></textarea>

                    </div>


                  </div>



                </section>

                <section>
                  <h3>9. El Inmueble determinado en el rubro 3 consta a nombre de la/s personas determinada/s en el rubro 4</h3>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="solicitud Nro"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Fecha"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Antecede"
                        className="input input-bordered"
                      />

                    </div>


                  </div>
                </section>
                <section>
                  <h3>10. ADVERTENCIA: CERTIFICACIONES VIGENTES </h3>
                  <span>(con prioridad respecto de la presente: Art. 42 Ley 6435)</span>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Fecha"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Certificado"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Operacion"
                        className="input input-bordered"
                      />

                    </div>


                  </div>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Escribano o juzgado"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Reg nro"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Localidad"
                        className="input input-bordered"
                      />

                    </div>


                  </div>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Plazo"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">

                    </div>
                    <div className="form-control ml-4 w-full ">


                    </div>


                  </div>
                </section>
                <section>
                  <h3>11. Por el inmueble determinado en la solicitud se registra </h3>
                  <h5>Hipoteca - Inscripcion </h5>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Tomo"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Folio"
                        className="input input-bordered"
                      />

                    </div>
                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Numero"
                        className="input input-bordered"
                      />

                    </div>


                  </div>
                  <h5>Escrituracion </h5>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Fecha"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Reg nro"
                        className="input input-bordered"
                      />

                    </div>
                   
                  </div>
                 
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Localidad"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">
                      <input
                        type="text"
                        placeholder="Escribano"
                        className="input input-bordered"
                      />

                    </div>
                   
                  </div>
                  <div className="mb-4 flex ">
                    <div className="form-control w-full">
                      <input
                        type="text"

                        placeholder="Plazo"
                        className="input input-bordered"
                      />
                    </div>

                    <div className="form-control ml-4 w-full ">

                    </div>
                    <div className="form-control ml-4 w-full ">


                    </div>


                  </div>
                </section>
              </div>
              <div className="flex justify-end items-center">
                <button

                  className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
