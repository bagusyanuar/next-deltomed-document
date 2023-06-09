export type ProductionModel = {
    id: string,
    code: string,
    name: string,
    production_step: Array<ProductionStepModel>
}

export type ProductionStepModel = {
    id: string,
    production_id: string,
    name: string,
    index_of: number,
    production_sub_step: Array<ProductionSubStepModel>
}

export type ProductionSubStepModel = {
    id: string,
    production_step_id: string,
    name: string,
    index_of: number
}