import { model, Schema } from "mongoose"
import type { TSocial } from "./social.interface.js"


const socialSchema = new Schema<TSocial>({
    title:String,
    link:String,
},
{
    timestamps:true
}
)



export const socialModel = model<TSocial>('social', socialSchema)

 