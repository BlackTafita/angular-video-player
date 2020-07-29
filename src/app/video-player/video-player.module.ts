import { NgModule } from '@angular/core';
import { VideoPlayerComponent } from './video-player.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [VideoPlayerComponent],
  exports: [VideoPlayerComponent],
})

export class NgVideoPlayerModule {

}
