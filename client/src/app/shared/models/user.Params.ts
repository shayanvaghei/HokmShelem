// class to be user for UserParams for searching

export interface IBadges {
    id: number;
    name: string;
}

export interface ICountry {
    id: number;
    name: string;
}

export interface IOrderBy {
    value: string;
    display: string;
}

export class UserParams {
    pageNumber = 1;
    pageSize = 12;
    badge: string = 'All';
    country: string = 'All';
    orderBy = 'all';
    searchForName: string = '';
}


export const OrderByLists: IOrderBy[] = [
    {
        value: "orderByHokmScore",
        display: "Hokm Score"
    },
    {
        value: "orderByShelemScore",
        display: "Shelem Score"
    },
    {
        value: "orderByWins",
        display: "Wins"
    },
    {
        value: "orderByLoses",
        display: "Loses"
    },
    {
        value: "orderByQuits",
        display: "Quites"
    },
];