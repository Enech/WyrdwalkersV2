import TerritoryPlayerForces from './TerritoryPlayerForces.model';

export default class Territory {
    public _id: string;
    public name: string;
    public nameVO: string;
    public key: number;
    public owner: string;
    public titanForces: number;
    public playersForces: TerritoryPlayerForces[];
    public gameID: string;

    constructor() {
        this._id = "";
        this.name = "";
        this.nameVO = "";
        this.owner = "";
        this.gameID = "";
        this.titanForces = 0;
        this.key = -1;
        this.playersForces = new Array<TerritoryPlayerForces>();
    }
}