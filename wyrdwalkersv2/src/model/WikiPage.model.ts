import WikiPageContent from './WikiPageContent.model';

export default class WikiPage {
    public _id: string;
    public title: any;
    public author: string;
    public tags: string;
    public searchable: boolean;
    public isEditionLocked: boolean;
    public content: WikiPageContent[];
    public generalInfos: any;
    public myth: any;

    constructor() {
        this._id = '';
        this.title = {
            titleVF: '',
            titleVO: ''
        };
        this.author = '';
        this.tags = '';
        this.searchable = true;
        this.isEditionLocked = false;
        this.content = new Array<WikiPageContent>();
        this.generalInfos = {
            vf: '',
            vo: ''
        };
        this.myth = {
            vf: '',
            vo: ''
        };
    }
} 