import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { AccountDto } from '../../../shared/src/dto/account.dto';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    static fromDto(dto: AccountDto, password: string): User {
        const entity: User = new User();
        entity.admin = false;
        entity.firstname = dto.user.firstname;
        entity.lastname = dto.user.lastname;
        entity.username = dto.login.username;
        entity.password = password;

        return entity;
    }
}
