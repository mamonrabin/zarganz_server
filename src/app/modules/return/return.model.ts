import { model, Schema } from "mongoose"
import type { TReturns } from "./Return.interface.js"



const returnSchema = new Schema<TReturns>({
    description:String,
},
{
    timestamps:true
}
)



export const returnModel = model<TReturns>('return', returnSchema)

 