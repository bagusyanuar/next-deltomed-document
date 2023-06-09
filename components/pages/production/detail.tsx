import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import MyCard from '../../../components/card'
import MyModal from '../../../components/modal'
import MyTextField from '../../../components/forms/textfield'
import { ButtonLoading as MyButton } from '../../../components/forms/button'
import Stepper, { ShimmerStepper, VerticalStepper, ShimmerVerticalStepper } from '../../stepper'
import MyTable, { HeaderType, ColumnFormat } from '../../../components/table/client'
import { URLAdmin, ErrorRespose, APIResponse } from '../../../lib/api'
import { ProductionModel, ProductionStepModel, ProductionSubStepModel } from '../../../lib/api/model'
import { AxiosError } from 'axios'

function Detail({
    token,
    id
}: {
    token: unknown,
    id: string | undefined
}) {

    const path = '/production'
    const [isLoadingStart, setIsLoadingStart] = useState<boolean>(true)
    const [activeStep, setActiveStep] = useState<number>(0)
    const [dataProduction, setDataProduction] = useState<ProductionModel | null>(null)
    const [dataProductionStep, setDataProductionStep] = useState<Array<ProductionStepModel>>([])
    const [productionStepName, setProductionStepName] = useState<string>('')
    const [data, setData] = useState<Array<ProductionStepModel>>([])
    const [dataStepper, setDataStepper] = useState<Array<string>>([])
    const [dataSubStep, setDataSubStep] = useState<Array<ProductionSubStepModel>>([])

    const [modalProductionStep, setModalProductionStep] = useState<boolean>(false)

    const tableHeader: Array<HeaderType> = [
        {
            value: 'Index',
            sort: true,
            className: 'w-3 text-center',
        },
        {
            value: 'Name',
            sort: true
        },
    ]

    const tableColumns: Array<ColumnFormat> = [
        { value: 'index_of' },
        { value: 'name' },
    ]

    const handleChangeStep = (v: number) => {
        setActiveStep(v)
        setDataSubStep(data[v].production_sub_step)
    }

    const initData = async () => {
        try {
            setIsLoadingStart(true)
            URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
            const response = await URLAdmin.get(`${path}/${id}`);
            const data = response.data as APIResponse
            const production = data.data as ProductionModel;
            setDataProduction(production)
            setDataProductionStep(production.production_step)
            console.log(data);

            // setData(production.production_step)
            // let tmpDataStepper: Array<string> = []
            // production.production_step.forEach((v, k) => {
            //     tmpDataStepper.push(v.name)
            // })
            // setDataStepper(tmpDataStepper)
            // console.log(production);
        } catch (error: any | AxiosError) {
            let err: APIResponse = ErrorRespose(error);
            console.log(err);
        } finally {
            setIsLoadingStart(false)
        }
    }
    useEffect(() => {
        initData();
    }, [])
    return (
        <div>
            <MyCard>
                <div className='flex justify-between items-center'>
                    {
                        isLoadingStart ?
                            <div className='w-1/3 h-2 bg-slate-300 animate-pulse rounded-md'></div> :
                            <p className='text-gray-600 text-sm'>{dataProduction?.name}</p>
                    }

                </div>
                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                {
                    isLoadingStart
                        ?
                        <div className='w-full flex'>
                            <div className='w-1/5 border-r border-gray-400 min-h-[400px]'>
                                <ShimmerVerticalStepper />
                            </div>
                            <div className='grow pl-3'>
                                <div className='w-2/3 h-2 bg-slate-300 animate-pulse rounded-md mb-3'></div>
                                <div className='w-full h-[400px] bg-slate-300 animate-pulse rounded-md'></div>
                            </div>
                        </div>
                        :
                        <div className={`w-full flex min-h-[450px] ${dataProductionStep.length <= 0 ? 'justify-center items-center' : ''}`}>
                            {
                                dataProductionStep.length > 0
                                    ?
                                    <></>
                                    :
                                    <div
                                        className='flex flex-col justify-center items-center hover:cursor-pointer'
                                        onClick={() => { setModalProductionStep(true) }}
                                    >
                                        <Image src="/assets/no_data.svg" height={120} width={120} alt='no_data_image' />
                                        <span className='text-sm text-slate-600'>No Production Step Data</span>
                                    </div>
                            }
                        </div>
                }

                {/* <MyTable
                    headers={tableHeader}
                    data={dataSubStep}
                    column={tableColumns}
                    pagination={false}
                    withIndex={false}
                /> */}
            </MyCard>
            <MyModal
                open={modalProductionStep}
                onClose={() => { setModalProductionStep(false) }}
                title='Modal Add Production Step'
            >
                <MyTextField
                    type='text'
                    value={productionStepName}
                    onChange={(e, v) => { setProductionStepName(v) }}
                />
                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                <div className='flex justify-end'>
                    <MyButton isLoading={false} onClick={() => { }}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            check
                        </span>
                        <span>save</span>
                    </MyButton>
                </div>
            </MyModal>
        </div>
    )
}

export default Detail