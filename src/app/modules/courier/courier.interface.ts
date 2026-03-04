export type TCourier = {
    courierMethod: 'STEADFAST' | 'PATHAO' | 'BKASH' | 'NOGHAD';
    baseUrl:string;
    userName:string;
    apiKey:string;
    secretKey:string;
    clientKey:string;
    clientId:string;
    clientSecret:string;
    email:string;
    password:string;
    grantType:string;
    status:boolean;
}