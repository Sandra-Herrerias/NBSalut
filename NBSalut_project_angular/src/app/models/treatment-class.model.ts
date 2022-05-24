export class TreatmentClass {
    id: number;
    name: string;
    price: number;
    description: string;
    active: boolean;

    constructor(id: number = 0, name: string = "", price: number = 0, description: string = "", active: boolean = true) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.active = active;
    }
}
