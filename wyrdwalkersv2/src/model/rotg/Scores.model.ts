export default class Scores {
    public _id: string;
    public playerID: string;
    public gameID: string;
    public pantheon: string;
    public nbTerritories: number;
    public victoryPoints: number;

    constructor(){
        this._id = "";
        this.playerID = "";
        this.gameID = "";
        this.pantheon = "";
        this.nbTerritories = 0;
        this.victoryPoints = 0;
    }
}