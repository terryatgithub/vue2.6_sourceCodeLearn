type Feature1 = {
    id: number,
    name: string
}
//Feature也可用接口形式约束
export interface Feature {
    id: number,
    name: string
}

type Select = {
    selected: boolean
}

export type FeatureSelect = Feature & Select 