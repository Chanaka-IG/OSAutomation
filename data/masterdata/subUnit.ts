
export interface subunit {

    parentId: number,
    unitId: string,
    name: string,
    description: string
}

const subUnitList: any[] = [
    {
        parentId: 1,
        unitId: "001",
        name: "Dept 1",
        description: "Dept 1 descrption"
    },
    {
        parentId: 1,
        unitId: "002",
        name: "Dept 2",
        description: "Dept 2 descrption"
    }

]

export const subUnits: subunit[] = subUnitList.map(val => ({

        parentId: val.parentId,
        unitId: val.unitId,
        name: val.name,
        description: val.description
}))