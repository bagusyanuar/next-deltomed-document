import React, { useState, useEffect } from 'react'
import MyCard from '../../../components/card'
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
    const [activeStep, setActiveStep] = useState<number>(0)
    const [data, setData] = useState<Array<ProductionStepModel>>([])
    const [dataStepper, setDataStepper] = useState<Array<string>>([])
    const [dataSubStep, setDataSubStep] = useState<Array<ProductionSubStepModel>>([])

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
            URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
            const response = await URLAdmin.get(`${path}/${id}`);
            const data = response.data as APIResponse
            const production = data.data as ProductionModel;
            setData(production.production_step)
            let tmpDataStepper: Array<string> = []
            production.production_step.forEach((v, k) => {
                tmpDataStepper.push(v.name)
            })
            setDataStepper(tmpDataStepper)
            console.log(production.production_step);
        } catch (error: any | AxiosError) {
            let err: APIResponse = ErrorRespose(error);
            console.log(err);
        }
    }
    useEffect(() => {
        initData();
    }, [])
    return (
        <div>
            <MyCard>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-600 text-sm'>Production Step</p>
                </div>
                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                <div className='w-full flex text-center mb-3'>
                    {/* <Stepper data={dataStepper} onChange={(v) => { handleChangeStep(v) }} /> */}
                    {/* <ShimmerStepper /> */}
                    <div className='w-1/5 border-r border-gray-400 min-h-[400px]'>
                        <ShimmerVerticalStepper />
                    </div>
                    <div className='grow pl-3'>
                        <div className='h-20 w-full relative'>
                            <div className='bg-green-500 w-full h-8 absolute top-3'>abc</div>
                            <div className='h-8 w-20 absolute left-3 top-2 bg-red-400'></div>
                        </div>
                    </div>

                </div>
                {/* <MyTable
                    headers={tableHeader}
                    data={dataSubStep}
                    column={tableColumns}
                    pagination={false}
                    withIndex={false}
                /> */}
            </MyCard>

        </div>
    )
}

export default Detail