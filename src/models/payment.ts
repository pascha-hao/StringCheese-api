import {Entity, property, model} from '@loopback/repository';

@model()
export class Payment extends Entity {
    @property({
    type: 'string',
    required: true
    })
    ccnum: string;

    @property({
    type: 'string',
    required: true
    })
    exp: string;

    @property({
    type: 'string',
    required: true
    })
    cvc: string;

    @property({
    type: 'number',
    required: true
    })
    userID: number;
    
}