import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isPlatformBrowser } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('MoveTitle', { static: false }) titleAnimation!: ElementRef<HTMLHeadingElement>;

  @ViewChild('moveImg1') moveImg1!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg2') moveImg2!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.prepareTitleSpans();
        this.contactImageMove();
        this.animateOnLoad();
      }, 200);
    }
  }

  
  prepareTitleSpans() {
    const titleEl = this.titleAnimation.nativeElement;
    if (titleEl.querySelectorAll('span').length) return;

    const text = titleEl.textContent || '';
    titleEl.innerHTML = '';

    const letters = text.split('');
    letters.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      titleEl.appendChild(span);
    });
  }


  animateOnLoad() {
    const titleEl = this.titleAnimation.nativeElement;
    const letters = titleEl.querySelectorAll('span');

    gsap.to(letters, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.05,
      delay: 0.2,
      clearProps: 'all',
    });
  }


  contactImageMove() {
    const imgs = [
      this.moveImg1?.nativeElement,
      this.moveImg2?.nativeElement
    ].filter(Boolean);

    imgs.forEach((img, index) => {
      gsap.to(img, {
        y: index % 2 === 0 ? '+=300' : '-=300',
        rotate: index % 2 === 0 ? '+=1.5' : '-=1.5',

        duration: 1.5,
        repeat: -1,
        yoyo: true,
        transformPerspective: 800,
        ease: 'power1.inOut',
      });
    });
  }



}
