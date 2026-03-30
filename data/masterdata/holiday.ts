export interface Holiday {
    name: string;
    date: string;
    type: string;
    length: number;
    repeatAnnually: boolean;
}

export const holdayData = [

    {

        name: "Poya",
        date: "2026-08-15",
        recurring: false,
        length: 0 // 0: Full Day, 4: Half Day

    },
     {

        name: "New Year",
        date: "2026-04-14",
        recurring: true,
        length: 0 // 0: Full Day, 4: Half Day

    },
     {

        name: "Christmas",
        date: "2026-12-25",
        recurring: true,
        length: 0 // 0: Full Day, 4: Half Day

    },
     {

        name: "Thai Pongal",
        date: "2021-01-27",
        recurring: true,
        length: 4 // 0: Full Day, 4: Half Day

    }
]