import Stepper, { Shimmer } from './stepper'
import Vertical, {Shimmer as ShimmerForVerticalStepper} from './vertical-stepper'

export interface StepperProps { data: Array<string>, onChange?: (v: number) => void }
export default Stepper
export const ShimmerStepper = Shimmer
export const VerticalStepper = Vertical
export const ShimmerVerticalStepper = ShimmerForVerticalStepper