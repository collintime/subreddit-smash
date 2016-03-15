import {Component, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {BackgroundsService} from './backgrounds.service';
import {CaptionsService} from './captions.service';

@Component({
    selector: 'smash',
    templateUrl: 'app/smash.component.html',
    viewProviders: [HTTP_PROVIDERS],
    styleUrls: ['app/smash.component.css']
})

export class SmashComponent implements OnInit {

    imageNumber: number = 1; // next to load
    captionNumber: number = 1;
    imageSubReddits: string[] = ['earthporn', 'foodporn', 'SpaceWallpapers'];
    captionSubReddits: string[] = ['showerthoughts', 'titlegore', 'circlejerk', 'pyongyang'];
    images;
    captions;

    constructor(private _http: Http, 
                private _backgroundService: BackgroundsService,
                private _captionService: CaptionsService) {
    }
    
    ngOnInit() {
        
        this._backgroundService.backgrounds$.subscribe(updatedImages => {
            
            this.images = updatedImages;
            this.swapImg(this.images[0]);
        });
        
        this._backgroundService.loadBackgrounds(this.imageSubReddits[0]);
        
        this._captionService.captions$.subscribe(updatedCaptions => {
            
            this.captions = updatedCaptions;
            this.swapCaption(this.captions[0]);
        });
        
        this._captionService.loadCaptions(this.captionSubReddits[0]);
    }

    change() {
        
        if (this.imageNumber < this.images.length -1) {
            ++this.imageNumber;
        }
        else {
            this.imageNumber = 0;
        }
        
        if (this.captionNumber < this.captions.length -1) {
            ++this.captionNumber;
        }
        else {
            this.captionNumber = 0;
        }
        
        let image = this.images[this.imageNumber];
        this.swapImg(image);
        let caption = this.captions[this.captionNumber];
        this.swapCaption(caption);
    }
    
    swapImg(img) {
        
        this.imgUrl = img.source.url;
    }
    
    swapCaption(caption) {
        
        this.caption = caption;
    }

    onCaptionSubChange(sub) {

        this._captionService.loadCaptions(sub);
    }

    onImageSubChange(sub) {

        this._backgroundService.loadBackgrounds(sub);
    }
}