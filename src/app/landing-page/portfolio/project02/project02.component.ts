import { CommonModule } from "@angular/common";

import {
  Component,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-project02",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./project02.component.html",
  styleUrl: "./project02.component.scss",

  animations: [
    trigger("fadeInOut_Ng", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(1200)]),
      transition(":leave", [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class Project02Component implements AfterViewInit {
  public isVisible = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
          this.cdr.detectChanges(); // Wichtig, um die Änderungen sofort an Angular weiterzugeben
        });
      },
      { threshold: 0.1 }
    ); // 10% des Elements müssen sichtbar sein, um als sichtbar zu gelten

    observer.observe(this.el.nativeElement); // Beobachte das Haupt-Element
  }
}