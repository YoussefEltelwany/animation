import { NgClass ,isPlatformBrowser} from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild , AfterViewInit, PLATFORM_ID , Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from "gsap";



@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {

private lastScrollTop = 0;
isMenuOpen = false;



@ViewChild('navbar', { static: true }) navbar!: ElementRef<HTMLElement>;
@ViewChild('mobileMenu', { static: false }) mobileMenu!: ElementRef<HTMLDivElement>;
 @ViewChild('menuLinks', { static: false }) menuLinks!: ElementRef<HTMLDivElement>;
  @ViewChild('menuButtons', { static: false }) menuButtons!: ElementRef<HTMLDivElement>;
 @HostListener('window:scroll', []) onWindowScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      this.navbar.nativeElement.style.transform = 'translateY(-130%)';
    }
    else {
      this.navbar.nativeElement.style.transform = 'translateY(0)';
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {

      }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.animateMenuOpen();
  }

  closeMenu(){
    this.isMenuOpen = false;
    this.animateMenuClose();
  }




 private animateMenuOpen() {
  if (!this.mobileMenu) return;

  const menu = this.mobileMenu.nativeElement;
  const links = this.menuLinks.nativeElement.querySelectorAll('a');
  const buttons = this.menuButtons.nativeElement.querySelectorAll('button');

  // إعداد البداية
  gsap.set(menu, { opacity: 0, y: -30, scale: 0.98, filter: 'blur(6px)' });
  gsap.set(links, { opacity: 0, y: 20 });
  gsap.set(buttons, { opacity: 0, y: 20, scale: 0.9 });

  // التايملاين
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(menu, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    duration: 0.5,
  })
    .to(
      links,
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
      },
      '-=0.2'
    )
    .to(
      buttons,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
      },
      '-=0.25'
    );
}


private animateMenuClose() {
  if (!this.mobileMenu) return;

  const menu = this.mobileMenu.nativeElement;
  const links = this.menuLinks.nativeElement.querySelectorAll('a');
  const buttons = this.menuButtons.nativeElement.querySelectorAll('button');

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => {
      this.isMenuOpen = false; // يخفي المينيو بعد الأنيميشن
    },
  });

  tl.to(buttons, {
    opacity: 0,
    y: 15,
    scale: 0.95,
    stagger: 0.05,
    duration: 0.25,
  })
    .to(
      links,
      {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.25,
      },
      '-=0.2'
    )
    .to(menu, {
      opacity: 0,
      y: -40,
      scale: 0.97,
      filter: 'blur(4px)',
      duration: 0.4,
    });
}




}
