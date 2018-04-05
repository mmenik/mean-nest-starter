import { PasswordCrypt } from './password-crypt.interface';
import { hashSync, compareSync } from 'bcrypt';
import { Component } from '@nestjs/common';

@Component()
// tslint:disable-next-line:component-class-suffix
export class PasswordCryptService implements PasswordCrypt {
    async doHash(plaintextPassword: string): Promise<string> {
        return await hashSync(plaintextPassword, 10);
    }

    async doCompare(plaintextPassword: string, hash: string): Promise<boolean> {
        return await compareSync(plaintextPassword, hash);
    }
}
