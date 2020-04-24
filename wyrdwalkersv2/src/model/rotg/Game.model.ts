export default class Game {
    public _id: string;
    public name: string;
    public playersIds: string[];
    public startDate: string;
    public endDate: string;
    public closed: boolean;
    public running: boolean;
    public locked: boolean;
    public turn: number;
    public won: boolean;
    public timerMode: boolean;
    public creatorUser: string;
    public readyRequired: boolean;

    constructor(){
        this._id = "";
        this.name = "";
        this.playersIds = new Array<string>();
        this.startDate = "";
        this.endDate = "";
        this.closed = false;
        this.running = false;
        this.locked = false;
        this.won = false;
        this.turn = 0;
        this.timerMode = false;
        this.creatorUser = "";
        this.readyRequired = false;
    }
}