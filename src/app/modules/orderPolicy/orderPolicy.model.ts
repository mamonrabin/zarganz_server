import { model, Schema } from "mongoose"
import type { TOrderPolicy } from "./orderPolicy.interface.js"


const orderPolicySchema = new Schema<TOrderPolicy>({
    description:String,
},
{
    timestamps:true
}
)



export const orderPolicyModel = model<TOrderPolicy>('orderPolicy', orderPolicySchema)

 