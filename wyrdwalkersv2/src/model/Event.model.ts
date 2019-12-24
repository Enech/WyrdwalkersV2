export default class EventJdr{
    public _id: string;
    public nameVF: string;
    public nameVO: string;
    public descriptionVO: string;
    public descriptionVF: string;
    public characters: string[];
    public timeline: string;
    public picture: string;
    public pictureAuthor: string;
    public pictureAuthorLink: string;
    public music: string;
    public linkedEvents: string[];
    public year: string;
    public captionVF: string;
    public captionVO: string;

    constructor(){
        this._id = '';
        this.nameVF = '';
        this.nameVO = '';
        this.descriptionVO = '';
        this.descriptionVF = '';
        this.characters = new Array<string>();
        this.timeline = '';
        this.picture = '';
        this.pictureAuthor = '';
        this.pictureAuthorLink = '';
        this.music = '';
        this.linkedEvents = new Array<string>();
        this.year = '';
        this.captionVF = '';
        this.captionVO = '';
    }
}