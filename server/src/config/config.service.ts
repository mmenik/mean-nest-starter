import { Component } from '@nestjs/common';

@Component()
// tslint:disable-next-line:component-class-suffix
export class ConfigService {
    private readonly _config: any;

    constructor() {
        this._config = require('../config.json');
        console.log(this._config);
    }

    get(): any {
        return this._config;
    }
}
