export class VisitClass {
    id: number;
    patient: string;
    dni: string;
    date: Date;
    price: number;
    description: string;

    constructor(id: number = 0, patient: string = "", dni:string = "", date: Date, price: number = 0, description: string = "") {
        this.id = id;
        this.patient = patient;
        this.dni = dni;
        this.date = date;
        this.price = price;
        this.description = description;
    }
}
