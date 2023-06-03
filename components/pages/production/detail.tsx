import React, { useState, useEffect } from 'react'
import MyCard from '../../../components/card'
import Stepper from '../../stepper'

//redux import
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectState as SelectProductionStepState, } from '../../../redux/features/production-step/slice'
import { getData as getDataProductionStep, create, PostData } from '../../../redux/features/production-step/action'
function Detail({
    token,
    id
}: {
    token: unknown,
    id: string | undefined
}) {
    const productionStepState = useAppSelector(SelectProductionStepState)
    const dispatch = useAppDispatch()

    const [activeStep, setActiveStep] = useState<number>(0)
    const dataStepper = ['Production 1', 'Production 2', 'Production 3']

    const handleChangeStep = (v: number) => {
        setActiveStep(v)
    }

    const initData = async () => {
        await dispatch(getDataProductionStep({ token: token, limit: 5, offset: 0 }))
        console.log(productionStepState.data);
    }
    useEffect(() => {
        initData()
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