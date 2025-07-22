
import gsap from 'gsap';
import logo from './favicon.png';


window.onload = () => {
  document.querySelector('.logo').src = logo;
  const tl = gsap.timeline();

  tl.from("h1", {
    duration: 1.5,
    y: -50,
    opacity: 0,
    ease: "power3.out",
    filter: "blur(10px)"
  })

  .from(".logo", {
    duration: 1.8,
    scale: 0,
    opacity: 0,
    ease: "back.out(1.7)"
  }, "-=1")

  .from(".text", {
    duration: 1.2,
    opacity: 0,
    y: 30,
    ease: "power2.out"
  }, "-=1")

  .from(".reseaux", {
    opacity: 0,
    y: 20,
    scale: 0.3,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.3,
    duration: 1.2
  }, "-=0.5");
};