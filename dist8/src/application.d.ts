import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { Booter, Binding } from '@loopback/boot';
declare const GoldenThreadApiApplication_base: (new (...args: any[]) => {
    [x: string]: any;
    projectRoot: string;
    bootOptions?: {
        [prop: string]: any;
        controllers?: {
            dirs?: string | string[] | undefined;
            extensions?: string | string[] | undefined;
            nested?: boolean | undefined;
            glob?: string | undefined;
        } | undefined;
        repositories?: {
            dirs?: string | string[] | undefined;
            extensions?: string | string[] | undefined;
            nested?: boolean | undefined;
            glob?: string | undefined;
        } | undefined;
    } | undefined;
    boot(): Promise<void>;
    booters(...booterCls: (new (...args: any[]) => Booter)[]): Binding<any>[];
    component(component: new (...args: any[]) => {}): void;
    mountComponentBooters(component: new (...args: any[]) => {}): void;
}) & typeof RestApplication;
export declare class GoldenThreadApiApplication extends GoldenThreadApiApplication_base {
    constructor(options?: ApplicationConfig);
    start(): Promise<void>;
}
