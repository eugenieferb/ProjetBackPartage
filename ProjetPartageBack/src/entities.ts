export interface Users{
    _id?:any;
    name:string;
    role:string;
    address:string;
};
export interface Annonces{
    _id?:any;
    name: string;
    description:string;
    status:string;
    type: string;
    owner: {
        _id:any;
        name:string;
        address:string;
    }
};
export interface Emprunts{
    _id?:any;
    message:string;
    duree:string;
};