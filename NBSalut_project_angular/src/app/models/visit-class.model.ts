export class VisitClass {
    id: number;
    patient: string;
    dni: string;
    visit_date: Date;
    user_id: number;
    description: string;
    specialist_name: string;

    constructor(id: number = 0, patient: string = "", dni:string = "", date: Date, user_id: number = 0, description: string = "", specialist: string = "") {
        this.id = id;
        this.patient = patient;
        this.dni = dni;
        this.visit_date = date;
        this.user_id = user_id;
        this.description = description;
        this.specialist_name = specialist;
    }
}
