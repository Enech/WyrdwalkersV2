export default class Scores {
    public playerID: string;
    public gameID: string;
    public pantheon: string;
    public nbTerritories: number;
    public victoryPoints: number;

    constructor(){
        this.playerID = "";
        this.gameID = "";
        this.pantheon = "";
        this.nbTerritories = 0;
        this.victoryPoints = 0;
    }
}