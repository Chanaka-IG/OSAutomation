export interface MembershipData {
    memebershipName: string;
}



const MembershipData : any []= [
    {
        memebershipName: "Test Membership",
    },
     {
        memebershipName: "Sports Club Membership",
    },
     {
        memebershipName: "Health Club Membership",
    }
]

export const MembershipDataList : MembershipData[] = MembershipData.map (val => {
    return {
        memebershipName: val.memebershipName,
    }
})