import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { UserDto } from '../../../shared/src/dto/user.dto';

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

    static fromDto(dto: UserDto, password: string): User {
        const entity: User = new User();
        entity.admin = false;
        entity.firstname = dto.firstname;
        entity.lastname = dto.lastname;
        entity.username = dto.username;
        entity.password = password;

        return entity;
    }
}
