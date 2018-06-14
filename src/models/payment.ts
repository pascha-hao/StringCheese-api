import {Entity, property, model} from '@loopback/repository';

@model()
export class Payment extends Entity {
    @property({
        type: 'number',
        id: true
      })
      payment_id?: number;

    @property({
    type: 'string',
    required: true
    })
    user_id1: number;

    @property({
    type: 'string',
    required: true
    })
    address_id1: number;

    @property({
    type: 'string',
    required: true
    })
    card_number: number;

    @property({
    type: 'number',
    required: true
    })
    expiration_date: number;

    @property({
        type: 'number',
        required: true
        })
        bank: string;
    
        @property({
            type: 'number',
            required: true
            })
            CVV: number;
    
       
    
}