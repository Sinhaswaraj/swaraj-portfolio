// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// A. Page Load Animations (Hero Section)
let tl = gsap.timeline();

tl.from(".nav-bar", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
  .from(".name-title", { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
  .from(".subtitle", { x: -30, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".power-section", { opacity: 0, duration: 1 }, "-=0.3")
  .from(".hero-img", { scale: 0.8, opacity: 0, duration: 1.5, ease: "power3.out" }, "-=1")
  .from(".info-tag", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2 }, "-=0.8");

// js/animations.js - নতুন যোগ করুন

// add gentle float animation to all info-tags
gsap.utils.toArray('.info-tag').forEach(tag => {
    gsap.to(tag, {
        y: -15, // ওপরে ১৫px ভাসবে
        x: -5, // বামে ৫px ভাসবে
        duration: 2.5, // ২.৫ সেকেন্ড সময় নেবে ওপরে যেতে
        ease: "power1.inOut",
        yoyo: true, // ওপরে যাওয়ার পর আবার নিচে নেমে আসবে
        repeat: -1, // সারাজীবন এই অ্যানিমেশন চলতে থাকবে
        delay: Math.random() // প্রত্যেকটা লেবেল আলাদা আলাদা সময় থেকে শুরু করবে
    });
});

// B. Parallax on Hero Image
gsap.to(".portrait-container", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// C. ScrollTrigger for About Section
gsap.from(".about-title", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".about-text", {
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from(".skill-box", {
    scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// js/animations.js এর একদম শেষে যোগ করো

// Pagination Update Logic
const sections = gsap.utils.toArray('section'); 
const dots = gsap.utils.toArray('.pagination .dot'); 
const currentNum = document.querySelector('.current-page'); 

sections.forEach((sec, i) => {
    if (dots[i]) {
        ScrollTrigger.create({
            trigger: sec,
            start: "top 50%", 
            end: "bottom 50%",
            markers: true, // 👈 এই লাইনটা যোগ করলাম টেস্টিংয়ের জন্য
            onEnter: () => updatePagination(i),
            onEnterBack: () => updatePagination(i)
        });
    }
});

function updatePagination(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentNum.innerText = "0" + (index + 1);
}