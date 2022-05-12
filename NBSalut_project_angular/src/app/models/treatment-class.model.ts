export class TreatmentClass {
    id: number;
    name: string;
    price: number;
    description: string;

    constructor(id: number = 0, name: string = "", price: number = 0, description: string = "") {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
