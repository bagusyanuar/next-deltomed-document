import Stepper, { Shimmer } from './stepper'

export interface StepperProps { data: Array<string>, onChange?: (v: number) => void }
export default Stepper
export const ShimmerStepper = Shimmer