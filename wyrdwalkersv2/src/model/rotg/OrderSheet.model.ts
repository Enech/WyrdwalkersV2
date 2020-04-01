import OrderSheetParameter from './OrderSheetParameters.model';

export default class OrderSheet {
    public gameID: string;
    public timeOfSubmit: string;
    public dayOfSubmit: string;
    public processed: boolean;
    public processTime: string;
    public ordersSent: number[];
    public parameters: OrderSheetParameter;

    constructor() {
        this.gameID = "";
        this.timeOfSubmit = "";
        this.dayOfSubmit = "";
        this.processTime = "";
        this.processed = false;
        this.ordersSent = new Array<number>();
        this.parameters = new OrderSheetParameter();
    }
}