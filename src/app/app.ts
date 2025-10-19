import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet , Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('animation');

   constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          // 🔹 1. نوقف كل ScrollTrigger مؤقتًا
          ScrollTrigger.getAll().forEach(trigger => trigger.kill(false, false));

          // 🔹 2. نرجع الصفحة لأعلى
          window.scrollTo({ top: 0, behavior: 'instant' });

          // 🔹 3. نعمل Refresh بعد شوية لما الصفحة تستقر
          setTimeout(() => {
            ScrollTrigger.refresh(true);
          }, 400);
        });
    }
  }
}
