import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  PLATFORM_ID,
  Inject
} from '@angular/core';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {

  @ViewChild('videoFrame') videoFrame!: ElementRef<HTMLDivElement>;
  @ViewChild('loadingScreen', { static: false }) loadingScreen!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.setupTextIntro();
        this.setupScrollAnimation();
        this.forcePlayVideo();
        this.setupVideoWithLoading();
        ScrollTrigger.refresh();
      }, 300);
    }

  }


  forcePlayVideo() {

    const video: HTMLVideoElement | null =
      this.videoFrame.nativeElement.querySelector('video');

    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.currentTime = 0;

      video.play().catch((err) => {


        const resumePlay = () => {
          video.play().catch(() => { });
          document.removeEventListener('click', resumePlay);
          document.removeEventListener('scroll', resumePlay);
          document.removeEventListener('keydown', resumePlay);
        };

        document.addEventListener('click', resumePlay, { once: true });
        document.addEventListener('scroll', resumePlay, { once: true });
        document.addEventListener('keydown', resumePlay, { once: true });
      });
    };


    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplaythrough', tryPlay, { once: true });
    }

  }

  setupTextIntro() {
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

    setTimeout(() => {

      tl.from(".hero-heading:not(.right)", {
        x: -150,
        opacity: 0
      }, 0)

        // حركة   (GAMING)
        .from(".hero-heading.right", {
          x: -150,
          opacity: 0,
        }, 0)

        .from("p.max-w-64", {
          y: 50,
          opacity: 0,
          duration: 0.8
        }, 0.3)

        // حركة الزر
        .fromTo(
          "#watch-trailer",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          0.5
        );

      gsap.set(".hero-heading", { opacity: 0 });

    }, 0);
  }


  setupScrollAnimation() {

    setTimeout(() => {
      if (this.videoFrame && this.videoFrame.nativeElement) {
        const frame = this.videoFrame.nativeElement;


        gsap.set(frame, {
          clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
          borderRadius: '0% 0% 0% 0%',
        });



        gsap.to(frame, {
          clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
          borderRadius: '0% 0% 35% 10%',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: frame,
            start: 'top top',
            end: '+=600',
            scrub: 1,
            markers: false
          },
        });


      }
    }, 0);
  }


  setupVideoWithLoading(): void {
    const video: HTMLVideoElement | null = this.videoFrame.nativeElement.querySelector('video');
    if (!video) return;


    const hideLoader = () => {

      gsap.to(this.loadingScreen.nativeElement, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          this.loadingScreen.nativeElement.style.display = 'none';
        }
      });


      this.forcePlayVideo();
    };


    if (video.readyState >= 3) {
      hideLoader();
    } else {
      video.addEventListener('canplaythrough', hideLoader, { once: true });
    }
  }

}
