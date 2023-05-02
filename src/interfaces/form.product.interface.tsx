import IProduct from "./product.interface";



export default interface IForm<T>{
    operationType:string;
    data?: IProduct | T;
    action:(element:T)=> void;
    discard: ()=> void;
    title:string;
    paragraph:string;
}