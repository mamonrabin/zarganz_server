import { model, Schema } from "mongoose"
import type { TConditions } from "./conditions.interface.js"


const conditionsSchema = new Schema<TConditions>({
    description:String,
},
{
    timestamps:true
}
)



export const conditionsModel = model<TConditions>('conditions', conditionsSchema)

 