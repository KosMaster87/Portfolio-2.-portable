import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewportService } from '../../viewport-service.service';
import {

  arrowRight
} from '../../animation';
@Component({
  selector: 'app-arrow-right',
  standalone: true,
  imports: [],
  templateUrl: './arrow-right.component.html',
  styleUrl: './arrow-right.component.scss',
  animations: [

    arrowRight
  ],
})
export class ArrowRightComponent implements AfterViewInit, OnDestroy {
  slideIn = 'out';
  slideInRight = 'out';
  slideInLeft = 'out';
  slideInBottom: string = 'out';
  fromBackground: string = 'out';
  arrowInRight: string = 'out';
  private subscription: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.subscription = this.viewportService
      .observeElement(this.el.nativeElement)
      .subscribe((isIntersecting) => {
        this.arrowInRight = isIntersecting ? 'in' : 'out';
        this.cdr.detectChanges();
      });
  } 

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
