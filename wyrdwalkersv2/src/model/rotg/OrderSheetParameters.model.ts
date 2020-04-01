export default class OrderSheetParameter {
    public attackTarget: string;
    public armySent: number;
    public populateTarget: string;
    public gambleTarget: string;
    public gambleDefeat: boolean;
    public playerID: string;
    public foreseeTargets: string[];

    constructor() {
        this.attackTarget = "";
        this.armySent = 0;
        this.populateTarget = "";
        this.gambleTarget = "";
        this.gambleDefeat = false;
        this.playerID = "";
        this.foreseeTargets = new Array<string>();
    }
}