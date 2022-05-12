export class User {
    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
   
    constructor(private _id: string,
        private _first_name: string,
        private _last_name: string,
        private _email: string,
        private _password: string,
        private _role: string) {
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get first_name(): string {
        return this._first_name;
    }
    public set first_name(value: string) {
        this._first_name = value;
    }
    public get last_name(): string {
        return this._last_name;
    }
    public set last_name(value: string) {
        this._last_name = value;
    }


}
