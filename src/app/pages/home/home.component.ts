import { Component, ElementRef, ViewChild , AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [HeroComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  cursorPosition = { x: 0, y: 0 };
  hoverOpacity = 0;
  transformStyle: string = '';
  @ViewChild('clip') clip!: ElementRef<HTMLDivElement>;
  @ViewChild('MoveTitle') titleAnimation!: ElementRef<HTMLDivElement>;
  @ViewChild('MoveTitle2') titleAnimation2!: ElementRef<HTMLDivElement>;
  @ViewChild('entrance', { static: false }) entrance!: ElementRef<HTMLDivElement>;

  @ViewChild('tilt', { static: false }) tiltRef!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt1', { static: false }) tiltRef1!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt2', { static: false }) tiltRef2!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt3', { static: false }) tiltRef3!: ElementRef<HTMLDivElement>;

  @ViewChild('moveImg1') moveImg1!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg2') moveImg2!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg3') moveImg3!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg4') moveImg4!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.scrollPhoto();
        this.moveTitle();
        this.imageMove();
        this.contactImageMove();
        ScrollTrigger.refresh();
      }, 300);

    }
  }

// forAboutPhoto
 scrollPhoto() {
  const clip = this.clip.nativeElement;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: clip,
      start: "center center",
        end: "+=800 center",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
    },
  });


  tl.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
  });
}

moveTitle() {
  const titleAnim = this.titleAnimation.nativeElement;
  const titleAnim2 = this.titleAnimation2.nativeElement;
  const MoveTitle = this.tiltRef.nativeElement;
  const MoveTitle1 = this.tiltRef1.nativeElement;
  const MoveTitle2 = this.tiltRef2.nativeElement;
  const MoveTitle3 = this.tiltRef3.nativeElement;

  // إعداد البداية
   gsap.set(titleAnim, { x: 150, y: 150,  opacity: 0, rotate: 10,});
   gsap.set(titleAnim2, { x: -150, y: 150,  opacity: 0, rotate: -8,});
  gsap.set(MoveTitle, { x: 0, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle1, { x: 80, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle2, { x: -80, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle3, { x: 0, y: 100, opacity: 0, rotate: 0 });



   gsap.to(titleAnim, {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleAnim,
        start: "top 90%",
        end: "center 60%",
        toggleActions: "play none none reverse",
        scrub: 1.5,
      },
    });


    gsap.to(titleAnim2, {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleAnim2,
        start: "top 80%",
        end: "center 60%",
        toggleActions: "play none none reverse",
        scrub: 1.5,
      },
    });


   const tl = gsap.timeline({
    scrollTrigger: {
      trigger: MoveTitle,
      start: "100 bottom",
      end: "center bottom",
      toggleActions: "play none none reverse",
      scrub: 2,
    },
  });

  tl.to(MoveTitle, {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    duration: 3,
    ease: "power3.out",
  });




  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: MoveTitle1,
      start: "100 bottom",
      end: "center bottom",
      toggleActions: "play none none reverse",
      scrub: 2,
    },
  });

  tl1.to(MoveTitle1, {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    duration: 3,
    ease: "power3.out",
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: MoveTitle2,
      start: "100 bottom",
      end: "center bottom",
      toggleActions: "play none none reverse",
      scrub: 2,
    },
  });

   tl2.to(MoveTitle2, {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    duration: 3,
    ease: "power3.out",
  });

   const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: MoveTitle3,
      start: "100 bottom",
      end: "center bottom",
      toggleActions: "play none none reverse",
      scrub: 2,
    },
  });

   tl3.to(MoveTitle3, {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    duration: 3,
    ease: "power3.out",
  });

}



  onMouseMove(event: MouseEvent, element: HTMLDivElement) {
    const rect = element.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    this.transformStyle = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    element.style.transform = this.transformStyle;
  }

   onMouseLeave(element: HTMLDivElement) {
    element.style.transform = '';
  }



  onButtonMove(event: MouseEvent, button: HTMLDivElement) {
    const rect = button.getBoundingClientRect();
    this.cursorPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  onButtonEnter() {
    this.hoverOpacity = 1;
  }

  onButtonLeave() {
    this.hoverOpacity = 0;
  }


imageMove(){
   const element = this.entrance.nativeElement;

    element.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((yPos - centerY) / centerY) * -10;
      const rotateY = ((xPos - centerX) / centerX) * 10;

      gsap.to(element, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 500,
        ease: "power3.inOut",
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power3.inOut",
      });
    });
  }


 contactImageMove(){
   const imgs = [
      this.moveImg1?.nativeElement,
      this.moveImg2?.nativeElement,
      this.moveImg3?.nativeElement,
      this.moveImg4?.nativeElement
    ].filter(Boolean);

    imgs.forEach((img) => {

      gsap.to(img, {

        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });


      gsap.to(img, {
        y: '+=15',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
 }



}




