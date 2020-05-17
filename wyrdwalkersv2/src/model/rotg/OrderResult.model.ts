import FateConsequence from './FateConsequence.model';

export default class OrderResult {
    public _id: string;
    public playerID: string;
    public gameID: string;
    public turn: number;
    public order: number;
    public resourceCost: number;
    public cost: number;
    public resourceGain: number[];
    public gains: number[];
    public attackedPlaneID: string;
    public planeConquered: boolean;

    constructor(){
        this._id = "";
        this.playerID = "";
        this.gameID = "";
        this.turn = -1;
        this.order = -1;
        this.resourceCost = -1;
        this.cost = -1;
        this.attackedPlaneID = "";
        this.planeConquered = false;
        this.resourceGain = new Array<number>();
        this.gains = new Array<number>();
    }
}