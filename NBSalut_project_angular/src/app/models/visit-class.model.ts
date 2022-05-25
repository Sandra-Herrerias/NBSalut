export class VisitClass {
    id: number;
    user_id: string;
    dni: string;
    visit_date: Date;
    description: string;
    specialist_id: string;

    constructor(id: number = 0, patient: string = "", dni:string = "", date: Date, price: number = 0, description: string = "", specialist: string = "") {
        this.id = id;
        this.user_id = patient;
        this.dni = dni;
        this.visit_date = date;
        this.description = description;
        this.specialist_id = specialist;
    }
}
