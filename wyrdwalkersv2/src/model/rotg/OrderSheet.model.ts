import OrderSheetParameter from './OrderSheetParameters.model';

export default class OrderSheet {
    public _id: string;
    public gameID: string;
    public timeOfSubmit: string;
    public dayOfSubmit: string;
    public processed: boolean;
    public processTime: string;
    public ordersSent: number[];
    public parameters: OrderSheetParameter;
    public turn: number; // Equals turnsSpent in Game Object
    public sent: boolean;

    constructor() {
        this._id = "";
        this.gameID = "";
        this.timeOfSubmit = "";
        this.dayOfSubmit = "";
        this.processTime = "";
        this.processed = false;
        this.ordersSent = new Array<number>();
        this.parameters = new OrderSheetParameter();
        this.turn = 0;
        this.sent = false;
    }
}