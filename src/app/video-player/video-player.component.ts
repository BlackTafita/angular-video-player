import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, } from 'rxjs/operators';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {

  @ViewChild('video', {static: false}) video: ElementRef;

  videoSource = 'assets/video/1.mov';

  videoDuration$: Observable<number>;
  currentTime$: Observable<number>;

  playState = false;


  get videoElem() {
    return (this.video ? this.video.nativeElement : null) as HTMLVideoElement;
  }

  ngAfterViewInit() {
    this.videoElem.load();

    this.videoDuration$ = fromEvent(this.videoElem, 'loadedmetadata')
    .pipe(
      map(() => this.videoElem !== null ? Number(this.videoElem.duration.toFixed(0)) : 0),
    );

    this.currentTime$ = fromEvent(this.videoElem, 'timeupdate')
    .pipe(
      map(() => this.videoElem !== null ? Number(this.videoElem.currentTime.toFixed(0)) : 0),
    );
  }

  play() {
    this.videoElem.play();
    this.playState = true;
  }

  pause() {
    this.videoElem.pause();
    this.playState = false;
  }

  stop() {
    this.videoElem.pause();
    this.videoElem.currentTime = 0;
    this.playState = false;
  }

}
