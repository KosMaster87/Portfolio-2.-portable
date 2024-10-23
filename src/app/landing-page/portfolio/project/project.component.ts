import { CommonModule } from "@angular/common";

import {
  Component,
  AfterViewInit,
  ElementRef,
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
  selector: "app-project",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],

  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(1200)]),
      transition(":leave", [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ProjectComponent implements AfterViewInit {
  public isVisible = true;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
          this.cdr.detectChanges();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.el.nativeElement);
  }
}
