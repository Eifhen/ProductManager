
export default interface IProduct {
    id: string;
    title:string;
    description:string;
    price:number;
    stock:number;
    quantity:number;
    img?:string;
    [key:string]: any;
}