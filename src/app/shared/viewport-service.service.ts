import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ViewportService {
  /**
   * Soll beim erreichen des viewports mit einer Animatition getriggert werden.
   * @param element Das zu animierende Element.
   * @returns
   */
  observeElement(element: HTMLElement): Observable<boolean> {
    return fromEvent(window, "scroll").pipe(
      map(() => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      })
    );
  }
}
