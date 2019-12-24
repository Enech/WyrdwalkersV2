export default class Workshop {
    public _id: string;
    public name: string;
    public caption: string;
    public description: string;
    public location: string;
    public date: string;

    constructor(){
        this._id = '';
        this.name = '';
        this.caption = '';
        this.description = '';
        this.location = '';
        this.date = '';
    }
}