export default class Game {
    public name: string;
    public playersIds: string[];
    public startDate: string;
    public endDate: string;
    public closed: boolean;
    public running: boolean;
    public locked: boolean;

    constructor(){
        this.name = "";
        this.playersIds = new Array<string>();
        this.startDate = "";
        this.endDate = "";
        this.closed = false;
        this.running = false;
        this.locked = false;
    }
}