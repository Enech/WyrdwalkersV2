export default class WikiPageDense {
    public _id: string;
    public titleVF: string;
    public titleVO: string;
    public author: string;
    public searchable: boolean;
    public tags: string;
    public isEditionLocked: boolean;
    public generalInfos: boolean;
    public myth: boolean;    
    public timelines: number;

    constructor() {
        this._id = '';
        this.titleVF = '';
        this.titleVO = '';
        this.author = '';
        this.searchable = true;
        this.tags = '';
        this.isEditionLocked = false;
        this.generalInfos = false;
        this.myth = false;
        this.timelines = 0;
    }
}