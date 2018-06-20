import { Entity, property, model } from '@loopback/repository';

@model({
    name: "stripetoken"
})
export class StripeToken extends Entity {

    @property({
        type: 'string',
        required: true
    })
    id: string;

    @property({
        type: 'number',
        required: true
    })
    amount: number;

}