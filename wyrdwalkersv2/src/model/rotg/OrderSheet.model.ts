export default class OrderSheet {
    public gameID: string;
    public timeOfSubmit: string;
    public processed: boolean;
    public processTime: string;
    public playerID: string;
    public ordersSent: number[];

    constructor() {
        this.gameID = "";
        this.timeOfSubmit = "";
        this.processTime = "";
        this.playerID = "";
        this.processed = false;
        this.ordersSent = new Array<number>();
    }
}