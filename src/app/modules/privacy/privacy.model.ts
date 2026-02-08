import { model, Schema } from "mongoose"
import type { TPrivacy } from "./privacy.interface.js"


const privacySchema = new Schema<TPrivacy>({
    description:String,
},
{
    timestamps:true
}
)



export const privacyModel = model<TPrivacy>('privacy', privacySchema)

 