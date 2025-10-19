import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  cursorPosition = { x: 0, y: 0 };
  hoverOpacity = 0;
  transformStyle: string = '';

  @ViewChild('loadingScreen', { static: false }) loadingScreen!: ElementRef;

   @ViewChild('tilt', { static: false }) tiltRef!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt1', { static: false }) tiltRef1!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt2', { static: false }) tiltRef2!: ElementRef<HTMLDivElement>;
  @ViewChild('tilt3', { static: false }) tiltRef3!: ElementRef<HTMLDivElement>;
  @ViewChild('movePAr', { static: false }) movePAr!: ElementRef<HTMLDivElement>;

  @ViewChild('MoveTitle2') titleAnimation2!: ElementRef<HTMLDivElement>;
  @ViewChild('MoveTitle3') titleAnimation3!: ElementRef<HTMLDivElement>;
  @ViewChild('MoveTitle4') titleAnimation4!: ElementRef<HTMLDivElement>;
  @ViewChild('entrance', { static: false }) entrance!: ElementRef<HTMLDivElement>;

  @ViewChild('moveImg1') moveImg1!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg2') moveImg2!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg3') moveImg3!: ElementRef<HTMLDivElement>;
  @ViewChild('moveImg4') moveImg4!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngAfterViewInit(): void {
       if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.moveTitle();
        this.imageMove();
        this.animateImageEntrance();
        this.animateImageOnScroll();
        this.animateHeroTitle();
        this.animateParagraph();
        this.setupVideoWithLoading();
        this.contactImageMove();
        ScrollTrigger.refresh();
      }, 300);

    }
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

moveTitle() {

  const MoveTitle = this.tiltRef.nativeElement;
  const MoveTitle1 = this.tiltRef1.nativeElement;
  const MoveTitle2 = this.tiltRef2.nativeElement;
  const MoveTitle3 = this.tiltRef3.nativeElement;



  gsap.set(MoveTitle, { x: 0, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle1, { x: 80, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle2, { x: -80, y: 100, opacity: 0, rotate: 0 });
  gsap.set(MoveTitle3, { x: 0, y: 100, opacity: 0, rotate: 0 });



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

   animateImageEntrance() {
    const element = this.entrance.nativeElement;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: -5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }

   animateImageOnScroll() {
    const element = this.entrance.nativeElement;

    gsap.fromTo(
      element,
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }


   animateHeroTitle() {
    const title = this.titleAnimation2.nativeElement;
    const text = title.textContent || '';
    title.innerHTML = '';


    const letters = text.split('');
    letters.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // علشان المسافات
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      title.appendChild(span);
    });

    // أنيميشن لكل حرف
    gsap.fromTo(
      title.querySelectorAll('span'),
      {
        y: 50,
        opacity: 0,
        rotate: -10,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );
  }

  animateParagraph(): void {
  const movePAr = this.movePAr?.nativeElement;
  const titleAnimation3 = this.titleAnimation3?.nativeElement;
  const titleAnimation4 = this.titleAnimation4?.nativeElement;
  if (!movePAr) return;

  gsap.fromTo(
    movePAr,
    {
      x: 50,
      opacity: 0,
      rotateY: 5,
      scale: 0.98,
    },
    {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: movePAr,
        start: "top 75%",
        end: "center 60%",
        toggleActions: "play none none reverse",
      },
    }
  );

   gsap.fromTo(
    titleAnimation4,
    {
      x: -50,
      opacity: 0,
      rotateY: -5,
      scale: 0.98,
    },
    {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleAnimation4,
        start: "top 75%",
        end: "center 60%",
        toggleActions: "play none none reverse",
      },
    }
  );

   gsap.fromTo(
    titleAnimation3,
    {
      y: 50,
      opacity: 0,
      rotateX: 5,
      scale: 0.98,
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleAnimation3,
        start: "top 75%",
        end: "center 60%",
        toggleActions: "play none none reverse",
      },
    }
  );
}


 setupVideoWithLoading(): void {
  const loadingEl = this.loadingScreen?.nativeElement;
  const videoEl: HTMLVideoElement | null = this.tiltRef?.nativeElement.querySelector('video');

  if (!loadingEl || !videoEl) return;

  // إظهار شاشة التحميل أولًا
  gsap.set(loadingEl, { opacity: 1, display: 'flex' });

  const hideLoader = () => {
    gsap.to(loadingEl, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        loadingEl.style.display = 'none';
      },
    });
  };

  //  لما الفيديو يكون جاهز للعرض
  if (videoEl.readyState >= 3) {
    hideLoader();
  } else {
    videoEl.addEventListener('canplaythrough', hideLoader, { once: true });
  }

  // كمان نضيف حماية لو الفيديو فشل
  videoEl.addEventListener(
    'error',
    () => {
      console.warn(' Video failed to load.');
      hideLoader();
    },
    { once: true }
  );
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
