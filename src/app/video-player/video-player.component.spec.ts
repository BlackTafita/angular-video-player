import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  });
});
