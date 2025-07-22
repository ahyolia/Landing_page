import './style.css'; // Importation du CSS
import { gsap } from 'gsap';

// Animation pour le logo
gsap.from('.logo', {
    opacity: 0,
    scale: 0.5,
    rotation: 360,
    duration: 1.5,
    ease: 'back.out(1.7)',
});

// Animation pour le titre
gsap.from('.text h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out',
});

// Animation pour le paragraphe
gsap.from('.text p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1,
    ease: 'power2.out',
});

// Animation pour les icônes des réseaux sociaux (séquentielle)
gsap.from('.reseaux a', {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    stagger: 0.2, // Décalage entre chaque icône
    delay: 1.5,
    ease: 'elastic.out(1, 0.5)',
});