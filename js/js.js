
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const laserCanvas = document.getElementById('laser-canvas');
const lctx = laserCanvas.getContext('2d');

const resize = () => {
    canvas.width = laserCanvas.width = window.innerWidth;
    canvas.height = laserCanvas.height = window.innerHeight;
    laserCanvas.style.width = laserCanvas.parentElement.offsetWidth + 'px';
    laserCanvas.style.height = laserCanvas.parentElement.offsetHeight + 'px';
};
resize();
window.addEventListener('resize', resize);


class Line {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -100;
        this.speed = 1 + Math.random() * 2;
        this.length = 120 + Math.random() * 180;
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.length);
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.length);
        grad.addColorStop(0, '#00ccff');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ccff';
        ctx.stroke();
    }
}
const lines = Array.from({length: 60}, () => new Line());
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(l => { l.update(); l.draw(); });
    requestAnimationFrame(animate);
};
animate();


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (scrollY >= s.offsetTop - 150) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}` || (current === '' && a.getAttribute('href') === '#'));
    });
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.getAttribute('href');
        if (id === '#') window.scrollTo({top: 0, behavior: 'smooth'});
        else document.querySelector(id)?.scrollIntoView({behavior: 'smooth'});
    });
});


const observer = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)), {threshold: 0.3});
['.projects-intro', '.contact-intro', '.project-box'].forEach(sel => document.querySelectorAll(sel).forEach(el => observer.observe(el)));

document.getElementById('emailBox').addEventListener('click', () => {
    navigator.clipboard.writeText('ugo.castagna19@gmail.com').then(() => {
        const el = document.getElementById('emailBox');
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 2000);
    });
});
document.getElementById('year').textContent = new Date().getFullYear();

if (window.innerWidth <= 768) {
    document.body.classList.add('no-heavy-anim');
}