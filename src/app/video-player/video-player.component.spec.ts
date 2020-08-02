import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ VideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    component.videoSrc = 'assets/video/1.mp4';
    fixture.detectChanges();
  });

  describe('Basic Tests', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should have video', () => {
      expect(component.videoElem).toBeTruthy();
    });

    it('should init streams', () => {
      expect(component.videoDuration$).toBeTruthy();
      expect(component.currentTime$).toBeTruthy();
      expect(component.timeline$).toBeTruthy();
      expect(component.timelineChangeSub$).toBeTruthy();
    });
  });

  describe('Play/Pause Tests', () => {
    it('should be paused by default', () => {
       expect(component.videoElem.paused).toBeTruthy();
    });

    // it('should be played', () => {
    //   component.videoElem.autoplay = true;
    //   expect(component.videoElem.paused).toBeFalsy();
    // });
  });
});
