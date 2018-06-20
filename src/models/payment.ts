import {Entity, property, model} from '@loopback/repository';

@model({
    name: "payment"
  })
export class Payment extends Entity {
    
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        id: true
    })
    address_id: number;

    @property({
        type: 'number',
    })
    cardNumber: number;

    @property({
        type: 'number',
    })
    cardMonth: number;

    @property({
        type: 'number',
    })
    cardYear: number;

    @property({
        type: 'number',
    })
    cardCVV: number ;

    getPaymentMethodId() {
        return this.id;
    }



}