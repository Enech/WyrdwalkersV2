export default class PlayerHistory{
    public _id: string;
    public orichalcum: number;
    public army: number;
    public heroism: number;
    public prophets: number;
    public population: number;
    public fatebindings: number;
    public victoryPoints: number;
    public controlledPlanes: number;
    public playerID: string;
    public gameID: string;

    constructor(){
        this._id = "";
        this.playerID = "";
        this.gameID = "";
        this.orichalcum = 0;
        this.army = 0;
        this.heroism = 0;
        this.prophets = 0;
        this.population = 0;
        this.fatebindings = 0;
        this.victoryPoints = 0;
        this.controlledPlanes = 0;
    }
}