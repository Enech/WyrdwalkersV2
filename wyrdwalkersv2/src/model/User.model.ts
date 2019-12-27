import UserRights from './UserRights.model';

export default class User {
    public _id: string;
    public name: string;
    public city: string;
    public campaignTypes: string[];
    public login: string;
    public email: string;
    public rights: UserRights;
    public characters: string[];
    public looseNPC: string[]
    public playerCampaigns: string[];
    public masterCampaigns: string[];
    public isActivated: boolean;

    constructor(){
        this._id = '';
        this.city = '';
        this.name = '';
        this.login = '';
        this.email = '';
        this.isActivated = false;
        this.campaignTypes = new Array<string>();
        this.characters = new Array<string>();
        this.looseNPC = new Array<string>();
        this.playerCampaigns = new Array<string>();
        this.masterCampaigns = new Array<string>();
        this.rights = new UserRights();
    }
}