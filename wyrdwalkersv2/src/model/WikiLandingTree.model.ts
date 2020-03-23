export default class LandingTree {
    public key: string;
    public title: string;
    public description: string;
    public wikiLink: string;
    public children: LandingTree[];
    public parentKey: string;
    public picture: string;

    constructor(_key?: string, _title?: string, _desc?: string, link?: string, childNodes?: LandingTree[], _parentKey?: string, _picture ?: string){
        this.key = _key || '' ;
        this.title = _title || '',
        this.description = _desc || '';
        this.wikiLink = link || '';
        this.children = childNodes || new Array<LandingTree>();
        this.parentKey = _parentKey || '';
        this.picture = _picture || '';
    }
}