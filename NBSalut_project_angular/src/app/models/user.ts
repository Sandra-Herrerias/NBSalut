export class User {

     //Properties
     private _id!: number;
     private _first_name!: String;
     private _last_name!: String;
     private _password!: String;
     private _dni!: String;
     private _email!: String;
     private _phone!: String;
     private _birthdate!: Date;
     private _city!: String;
     private _address!: String;
     private _postal_code!: String;
     private _active!: boolean;
     private _previous_pathologies!: String;
     private _diabetic!: boolean;
     private _ss_CIP!: String;
     private _center_code!: String;
     private _num_clinical_log!: String;
     private _collegiate_num!: String;
     private _role!: String;
     private _register_date!: Date;
     /**
      * 
      * @param _id 
      * @param _first_name 
      * @param _last_name 
      * @param _password 
      * @param _dni 
      * @param _email 
      * @param _phone 
      * @param _birthdate 
      * @param _city 
      * @param _address 
      * @param _postal_code 
      * @param _active 
      * @param _previous_pathologies 
      * @param _diabetic 
      * @param _ss_CIP 
      * @param _center_code 
      * @param _num_clinical_log 
      * @param _collegiate_num 
      * @param _role 
      * @param _register_date
      */
    constructor(id?: number,
        first_name?: String,
        last_name?: String,
        password?: String,
        dni?: String,
        email?: String,
        phone?: String,
        birthdate?: Date,
        city?: String,
        address?: String,
        postal_code?: String,
        active?: boolean,
        previous_pathologies?: String,
        diabetic?: boolean,
        ss_CIP?: String,
        center_code?: String,
        num_clinical_log?: String,
        collegiate_num?: String,
        role?: String,
        register_date?: Date) {
             
            if (id != undefined) {
                this._id = id;
            }
            if (first_name != undefined) {
                this._first_name = first_name;
            }
            if (last_name != undefined) {
                this._last_name = last_name;
            }
            if (password != undefined) {
                this._password = password;
            }
            if (dni != undefined) {
                this._dni = dni;
            }
            if (email != undefined) {
                this._email = email;
            }
            if (phone != undefined) {
                this._phone = phone;
            }
            if (birthdate != undefined) {
                this._birthdate = birthdate;
            }
            if (city != undefined) {
                this._city = city;
            }
            if (address != undefined) {
                this._address = address;
            }
            if (postal_code != undefined) {
                this._postal_code = postal_code;
            }
            if (active != undefined) {
                this._active = active;
            }
            if (previous_pathologies != undefined) {
                this._previous_pathologies = previous_pathologies;
            }
            if (diabetic != undefined) {
                this._diabetic = diabetic;
            }
            if (ss_CIP != undefined) {
                this._ss_CIP = ss_CIP;
            }
            if (center_code != undefined) {
                this._center_code = center_code;
            }
            if (num_clinical_log != undefined) {
                this._num_clinical_log = num_clinical_log;
            }
            if (collegiate_num != undefined) {
                this._collegiate_num = collegiate_num;
            }
            if (role != undefined) {
                this._role = role;
            }
            if (register_date != undefined) {
                this._register_date = register_date;
            }   
    }

 
  
    /**
     * Getter id
     * @return {number}
     */
     public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }
    public get first_name(): String {
        return this._first_name;
    }
    public set first_name(value: String) {
        this._first_name = value;
    }
    public get last_name(): String {
        return this._last_name;
    }
    public set last_name(value: String) {
        this._last_name = value;
    }

    public get password(): String {
        return this._password;
    }
    public set password(value: String) {
        this._password = value;
    }

    public get dni(): String {
        return this._dni;
    }
    public set dni(value: String) {
        this._dni = value;
    }

    public get email(): String {
        return this._email;
    }
    public set email(value: String) {
        this._email = value;
    }

    public get phone(): String {
        return this._phone;
    }
    public set phone(value: String) {
        this._phone = value;
    }

    public get birthdate(): Date {
        return this._birthdate;
    }
    public set birthdate(value: Date) {
        this._birthdate = value;
    }


    public get city(): String {
        return this._city;
    }
    public set city(value: String) {
        this._city = value;
    }

    public get address(): String {
        return this._address;
    }
    public set address(value: String) {
        this._address = value;
    }   
    public get postal_code(): String {
        return this._postal_code;
    }
    public set postal_code(value: String) {
        this._postal_code = value;
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    public get previous_pathologies(): String {
        return this._previous_pathologies;
    }
    public set previous_pathologies(value: String) {
        this._previous_pathologies = value;
    }

    public get diabetic(): boolean {
        return this._diabetic;
    }
    public set diabetic(value: boolean) {
        this._diabetic = value;
    }

    public get ss_CIP(): String {
        return this._ss_CIP;
    }
    public set ss_CIP(value: String) {
        this._ss_CIP = value;
    }

    public get center_code(): String {
        return this._center_code;
    }
    public set center_code(value: String) {
        this._center_code = value;
    }

    public get num_clinical_log(): String {
        return this._num_clinical_log;
    }
    public set num_clinical_log(value: String) {
        this._num_clinical_log = value;
    }

    public get collegiate_num(): String {
        return this._collegiate_num;
    }
    public set collegiate_num(value: String) {
        this._collegiate_num = value;
    }

    public get role(): String {
        return this._role;
    }
    public set role(value: String) {
        this._role = value;
    }


    public get register_date(): Date {
        return this._register_date;
    }
    public set register_date(value: Date) {
        this._register_date = value;
    }
    
}
