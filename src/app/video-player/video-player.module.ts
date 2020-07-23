import { NgModule } from '@angular/core';
import { VideoPlayerComponent } from './video-player.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [VideoPlayerComponent],
  exports: [VideoPlayerComponent],
})

export class VideoPlayerModule {

}
