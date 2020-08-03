import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { map, } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ng-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @Input()
  set videoSrc(values: string | string[]) {
    this.videoPaths = (Array.isArray(values)) ? values : [values];
  }

  @Input()
  showToolbar = true;

  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('timeline', {static: false}) timelineEl: ElementRef;

  title: string;
  videoPaths: string[];

  videoDuration$: Observable<number>;
  currentTime$: Observable<number>;
  timeline$: Observable<string>;
  timelineChangeSub$: Subject<Event> = new Subject<Event>();

  volumeChangeSub$: Subscription;

  volumeControl: FormControl = new FormControl(75);

  get videoElem() {
    return (this.video ? this.video.nativeElement : null) as HTMLVideoElement;
  }

  ngAfterViewInit() {
    this.videoElem.load();
    this.title = this.videoPaths[0].match(/^.*\/(.*)\./)[1];
    this.initVideoStreams();
  }

  ngOnDestroy() {
    if (this.volumeChangeSub$ && this.volumeChangeSub$.unsubscribe) {
      this.volumeChangeSub$.unsubscribe();
    }
  }

  stop() {
    this.videoElem.pause();
    this.videoElem.currentTime = 0;
  }

  timelineChange(event: Event) {
    this.timelineChangeSub$.next(event);
  }

  toFullScreen() {
    const elem = this.video.nativeElement as HTMLVideoElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  initVideoStreams() {
    this.videoDuration$ = fromEvent(this.videoElem, 'loadedmetadata')
    .pipe(
      map(() => this.videoElem !== null ? Number(this.videoElem.duration.toFixed(0)) : 0),
      map(res => new Date(null).setSeconds(res))
    );

    this.currentTime$ = fromEvent(this.videoElem, 'timeupdate')
    .pipe(
      map(() => this.videoElem !== null ? Number(this.videoElem.currentTime.toFixed(0)) : 0),
      map(res => new Date(null).setSeconds(res))
    );

    const timelineDuration$ = combineLatest(this.currentTime$, this.videoDuration$)
    .pipe(
      map(([current, full]) => {
        return (current / (full / 100));
      })
    );

    const timelineChange$ = this.timelineChangeSub$
    .pipe(
      map((event: any) => {
        const percent = (event.offsetX / (this.timelineEl.nativeElement.offsetWidth / 100));
        this.videoElem.currentTime = Number(((this.videoElem.duration / 100) * percent).toFixed(0));
        return percent;
      }),
    );

    this.timeline$ = merge(timelineDuration$, timelineChange$)
    .pipe(
      map(val => val + '%')
    );

    this.volumeChangeSub$ = this.volumeControl.valueChanges.subscribe((res) => this.videoElem.volume = res / 100);
  }

  getVideoType(path: string): string {
    const val = path.match(/\.(.*)$/)[1];
    return 'video/' + val;
  }

}
