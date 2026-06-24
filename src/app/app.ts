import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private router = inject(Router);
  protected readonly title = signal('VotoDigital');

  days = 0;
  hours = 0;
  minutes = 0;
  private timerInterval: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown(): void {
    const electionDate = new Date('2026-04-12T07:00:00').getTime();

    const updateTime = () => {
      const now = new Date().getTime();
      const diff = electionDate - now;

      if (diff <= 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        clearInterval(this.timerInterval);
        return;
      }

      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    };

    updateTime();
    this.timerInterval = setInterval(updateTime, 60000); // Up
  }

  showLayout(): boolean {
    const url = this.router.url.split('?')[0];
    return url !== '/' && url !== '/register' && url !== '';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
