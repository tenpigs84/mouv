import { AfterViewInit, Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
  selector: '[camera]',
})
export class CameraDirective implements AfterViewInit {
  private video: HTMLVideoElement;
  constructor(private elem: ElementRef, private renderer: Renderer) {
    this.video = elem.nativeElement;
    // renderer.setElementStyle(video, 'backgroundColor', 'red');
  }
  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  }
}
