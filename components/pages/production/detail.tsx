import React, { useState, useEffect } from 'react'
import MyCard from '../../../components/card'
import Stepper from '../../stepper'
import { URLAdmin, ErrorRespose, APIResponse } from '../../../lib/api'
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
    const [data, setData] = useState<Array<any>>([])
    const [dataStepper, setDataStepper] = useState<Array<string>>([])
    // const dataStepper = ['Production 1', 'Production 2', 'Production 3']

    const handleChangeStep = (v: number) => {
        setActiveStep(v)
        console.log(data[v]);
    }

    const initData = async () => {
        try {
            URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
            const response = await URLAdmin.get(`${path}/${id}`);
            const data = response.data as APIResponse
            let production_step: Array<any> = data.data ? data.data['production_step'] : []
            let tmpDataStepper: Array<string> = []
            let tmpData: Array<any> = []
            production_step.forEach((v, k) => {
                tmpData.push(v)
                tmpDataStepper.push(v['name'])
            })
            setData(tmpData)
            setDataStepper(tmpDataStepper)
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
                <div className='w-full text-center'>
                    <Stepper data={dataStepper} onChange={(v) => { handleChangeStep(v) }} />
                </div>
            </MyCard>

        </div>
    )
}

export default Detail