export default class Pagination{
    public page: number;
    public itemsPerPage: number;
    public sortBy: string[];
    public sortDesc: boolean[];
    public groupBy: string[];
    public groupDesc: boolean[];
    public multiSort: boolean;
    public mustSort: boolean;

    constructor(){
        this.page = 1;
        this.itemsPerPage = 10;
        this.sortBy = new Array<string>();
        this.sortDesc = new Array<boolean>();
        this.groupBy = new Array<string>();
        this.groupDesc = new Array<boolean>();
        this.multiSort = false;
        this.mustSort = false;
    }
}