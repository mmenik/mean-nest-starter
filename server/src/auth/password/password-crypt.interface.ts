export interface PasswordCrypt {
    doHash(plaintextPassword: string): Promise<string>;

    doCompare(plaintextPassword: string, hash: string): Promise<boolean>;
}
