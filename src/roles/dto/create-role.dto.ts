import { MaxLength } from "class-validator";

export class CreateRoleDto {

    roleName: string;

    @MaxLength(100)
    description: string

}
