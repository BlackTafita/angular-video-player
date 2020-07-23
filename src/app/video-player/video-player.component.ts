import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, } from 'rxjs/operators';

@Component({
  selector: 'ng-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {

  @Input()
  videoSrc: string;

  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('timeline', {static: false}) timelineEl: ElementRef;

  playState = false;

  videoDuration$: Observable<number>;
  currentTime$: Observable<number>;
  timeline$: Observable<string>;
  timelineChangeSub$: Subject<Event> = new Subject<Event>();

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


    const timelineDuration$ = combineLatest(this.currentTime$, this.videoDuration$)
      .pipe(
        map(([current, full]) => {
          return (current / (full / 100)).toFixed(2);
        })
      );

    const timelineChange$ = this.timelineChangeSub$
      .pipe(
        map((event: any) => {
          const percent = (event.clientX / (this.timelineEl.nativeElement.getBoundingClientRect().right / 100));
          this.videoElem.currentTime = Number(((this.videoElem.duration / 100) * percent).toFixed(0));
          return percent.toFixed(2);
        }),
      );

    this.timeline$ = merge(timelineDuration$, timelineChange$)
      .pipe(
        map(val => val + '%')
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

  timelineChange(event: Event) {
    this.timelineChangeSub$.next(event);
  }

}
