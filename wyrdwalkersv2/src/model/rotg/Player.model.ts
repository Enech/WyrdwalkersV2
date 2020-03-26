import User from '../User.model';
import Pantheon from './Pantheon.model';

export default class Player {
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

    constructor() {
        this.user = new User();
        this.pantheon = new Pantheon();
        this.orichalcum = 0;
        this.army = 0;
        this.heroism = 0;
        this.population = 0;
        this.fatebindings = 0;
        this.prophets = 0;
        this.territories = new Array<string>();
        this.givenOrders = new Array<string>();
        this.defaultOrders = new Array<number>();
        this.gameID = "";
    }
}