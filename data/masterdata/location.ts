
export interface location {

    name: string;
    countryCode: string;
    province: string;
    city: string;
    address: string;
    zipCode: string;
    phone: string;
    fax: string;
    note: string;

}


const locationsDetails: any[] = [
    {
        name: "Washington",
        countryCode: "US",
        province: "Alebama",
        city: "Washington",
        address: "10/12, grandmach, washington",
        zipCode: "25698",
        phone: "56985455795",
        fax: "5155414444551",
        note: "Washington added"
    },
    {
        name: "Sydney",
        countryCode: "AU",
        province: "Alebama",
        city: "Washington",
        address: "10/12, grandmach, washington",
        zipCode: "25698",
        phone: "56985455795",
        fax: "5155414444551",
        note: "Washington added"
    },

]


export const location: location[] = locationsDetails.map(val => ({

    name: val.name,
    countryCode: val.countryCode,
    province: val.province,
    city: val.city,
    address: val.address,
    zipCode: val.zipCode,
    phone: val.phone,
    fax: val.fax,
    note: val.note
}))

