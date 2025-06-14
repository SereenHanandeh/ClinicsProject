import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from "../shared/pips/translate.pipe";

interface User {
  userType?: 'admin' | 'doctor' | 'patient';
  [key: string]: any; 
}

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.scss']
})
export class WelcomComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User = {};
  animationFrameId: number = 0;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : {};
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const count = 100;
      const colors = ['#ff3838', '#ff9f1a', '#32ff7e', '#7efff5', '#18dcff', '#7d5fff'];

      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          radius: 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          alpha: 1
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(${parseInt(p.color.slice(1, 3), 16)},${parseInt(p.color.slice(3, 5), 16)},${parseInt(p.color.slice(5, 7), 16)},${p.alpha})`;
        ctx.fill();

        if (p.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    setInterval(createFirework, 800);
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  goToUserPage(): void {
    switch (this.user.userType) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'doctor':
        this.router.navigate(['/doctor']);
        break;
      case 'patient':
        this.router.navigate(['/patient/dashboard']);
        break;
      default:
        console.warn('نوع المستخدم غير معروف، سيتم توجيهك إلى الصفحة الرئيسية.');
        this.router.navigate(['/']);
        break;
    }
  }
}
