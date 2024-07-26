'use strict';

const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
});

class Particle {
   constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius,
         this.color = color;
   }

   draw() {
      ctx.beginPath();
      ctx.arc(
         this.x,
         this.y,
         this.radius,
         0,
         Math.PI * 2,
         false
      );
      ctx.fillStyle = this.color;
      ctx.fill();
   }

   update() {
      if (this.x + this.radius > canvas.width || this.x + this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > canvas.height || this.y + this.radius < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      this.draw()
   }
}

function init() {
   for (let i = 0; i < canvas.width * canvas.height / 2500; i++) {
      const radius = Math.random() * 5 + 1;
      const x = Math.random() * (canvas.width - 2 * radius) + 2 * radius;
      const y = Math.random() * (canvas.height - 2 * radius) + 2 * radius;
      const dx = Math.random() * 5 - 2.5;
      const dy = Math.random() * 5 - 2.5;
      const color = '#0080ff';
      const particle = new Particle(x, y, dx, dy, radius, color);
      particles.push(particle);
   }
}

function connect() {
   for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
         const dist = Math.sqrt((particles[i].x - particles[j].x) ** 2 + (particles[i].y - particles[j].y) ** 2);

         if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 2;
            const opacity = 1 - dist / 100;
            ctx.strokeStyle = `rgba(0, 128, 255, ${opacity})`;
            ctx.stroke();
         }
      }
   }
}

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   for (let i = 0; i < particles.length; i++) {
      particles[i].update();
   }

   connect();

   requestAnimationFrame(animate);
}


init();
animate();