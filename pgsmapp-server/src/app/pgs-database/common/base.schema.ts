import { Prop } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

export class BaseSchema {

    @Prop({ type: Types.ObjectId, required: false })
    _id: ObjectId;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}