export class VisitClass {
    id: number;
    patient: string;
    date: Date;
    price: number;
    description: string;

    constructor(id: number = 0, patient: string = "", date: Date, price: number = 0, description: string = "") {
        this.id = id;
        this.patient = patient;
        this.date = date;
        this.price = price;
        this.description = description;
    }
}
