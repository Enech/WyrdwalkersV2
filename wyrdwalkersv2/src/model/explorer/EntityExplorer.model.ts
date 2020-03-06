import Origin from './Origin.model';
import Approche from './Approche.model';
import Domaine from './Domaine.model';
import Personality from './Personality.model';

export default class EntityExplorer {
    public _id: string;
    public name: string;
    public nameVO: string;
    public faction: any;
    public title: string;
    public titleVO: string;
    public origin: Origin;
    public approaches: Approche[];
    public domains: Domaine[];
    public personalities: Personality[];
    public logos: number;
    public kosmos: number;
    public eros: number;

    constructor(){
        this._id = '';
        this.name = '';
        this.nameVO = '';
        this.faction  = {};
        this.title = '';
        this.titleVO = '';
        this.origin = new Origin();
        this.approaches = new Array<Approche>();
        this.domains = new Array<Domaine>();
        this.personalities = new Array<Personality>();
        this.logos = -1;
        this.kosmos = -1;
        this.eros = -1;
    }
}
