import { FormField } from "./formField.model";

export interface Form 
{
    id: number;
    name: string;
    description: string;
    createdAt: string;
    createdBy: string;
    fields: FormField[];
}