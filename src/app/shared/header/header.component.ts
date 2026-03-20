import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isSubMenuVisible = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeLink = this.router.url.split('/')[1] || 'dashboard';
    console.log(this.activeLink);

  }

  onCheckIn(): void {
    // Implement check-in logic here
    console.log('Check-in clicked');
  }

  onMenuToggle(): void {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  onConfiguration(): void {
    // Implement configuration logic here
    console.log('Configuration clicked');
  }
  activeLink = 'dashboard';
  onManagement(): void {
    // Implement management logic here
    console.log('Management clicked');
  }

  onAction(): void {
    // Implement action logic here
    console.log('Action clicked');
  }

  onConsultation(): void {
    // Implement consultation logic here
    console.log('Consultation clicked');
  }

  onPowerBI(): void {
    // Implement Power BI logic here
    console.log('Power BI clicked');
  }
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  goToUserMangement() {
    // logout remove local storage and redirect to login page
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    return this.router.navigate(['/login']);




  }
  goToDashboard() {
    return this.router.navigate(['/dashboard']);
  }

  goToReports() {
    return this.router.navigate(['/settings']);
  }

  goToNaukari() {
    return this.router.navigate(['/naukari']);
  }

  goToConsultation() {
    return this.router.navigate(['/consultation']);
  }

  goTofindnumber() {
    return this.router.navigate(['/find_numbers']);
  }

  goToLinkedinProfile() {
    return this.router.navigate(['/linkedin-profile']);
  }
  goToNaukariSetup() {
    return this.router.navigate(['/naukari-setup']);
  }


}
