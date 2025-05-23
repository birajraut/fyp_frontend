export interface IRestaurantPayload {
    name:string,
    description:string,
    logo:File | null,
    address:string
}



export interface IRestaurantResponse {
    _id: string;
    name: string; 
    rating: number;
    image: string | null; 
    description: string;
    reviews: number; 
    __v: number;
}