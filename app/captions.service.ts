import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CaptionsService {
    
    captions$: Observable<Array<any>>;
    
    private _captionsObserver: any;
    private _dataStore: {
        captions: Array<any>
    }
    
    constructor(private _http: Http) {
        
        this.captions$ = new Observable(observer => 
            this._captionsObserver = observer).share();
        
        this._dataStore = {
            captions: []
        }
    }
    
    loadCaptions(subreddit) {
        
        this._http.get(`https://www.reddit.com/r/${subreddit}/top.json`)
            .map(res => {
                
                return res.json().data.children;
            })
            .subscribe(captions => {
                
                this._dataStore.captions = captions.map(child => child.data.title);
                this._captionsObserver.next(this._dataStore.captions);
            }, error => {
                
                console.log(error);
                console.log('could not load captions')
            });
    }
}