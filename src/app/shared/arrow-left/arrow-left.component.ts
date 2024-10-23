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

  arrowLeft
} from '../../animation';
@Component({
  selector: 'app-arrow-left',
  standalone: true,
  imports: [],
  templateUrl: './arrow-left.component.html',
  styleUrl: './arrow-left.component.scss',
  animations: [

    arrowLeft
  ],
})
export class ArrowLeftComponent implements AfterViewInit, OnDestroy {
  arrowLeft: string = 'out';
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
        this.arrowLeft = isIntersecting ? 'in' : 'out';
        this.cdr.detectChanges();
      });
  } 

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
