import { model, Schema } from "mongoose"
import type { TAbout } from "./about.interface.js"

const aboutSchema = new Schema<TAbout>({
    description:String,
    videoUrl:String
},
{
    timestamps:true
}
)



export const aboutModel = model<TAbout>('about', aboutSchema)

 