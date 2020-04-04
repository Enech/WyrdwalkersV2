import User from '../User.model';
import Pantheon from './Pantheon.model';

export default class Player {
    public _id: string;
    public user: User;
    public pantheon: Pantheon;
    public orichalcum: number;
    public army: number;
    public heroism: number;
    public population: number;
    public fatebindings: number;
    public prophets: number;
    public territories: string[];
    public givenOrders: string[];
    public defaultOrders: number[];
    public gameID: string;
    public titanForcesVisible: boolean;
    public sheetsVisible: string[];

    constructor() {
        this._id = "";
        this.user = new User();
        this.pantheon = new Pantheon();
        this.orichalcum = 3;
        this.army = 3;
        this.heroism = 3;
        this.population = 3;
        this.fatebindings = 0;
        this.prophets = 3;
        this.territories = new Array<string>();
        this.givenOrders = new Array<string>();
        this.sheetsVisible = new Array<string>();
        this.defaultOrders = new Array<number>();
        this.gameID = "";
        this.titanForcesVisible = false;
    }
}