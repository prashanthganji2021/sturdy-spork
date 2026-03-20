import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linkedin-profile',
  templateUrl: './linkedin-profile.component.html',
  styleUrls: ['./linkedin-profile.component.css']
})
export class LinkedinProfileComponent implements OnInit {
  accessToken: string | null = null; // Store access token
  userProfile: any; // User profile data
  profileUrl: string = ''

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check for existing access token
    this.accessToken = localStorage.getItem('linkedinAccessToken');

    if (this.accessToken) {
      // If token exists, fetch user profile directly
      this.getUserProfile();
    } else {
      // If there is an existing permission grant from the member: the authorization screen is bypassed and the member is immediately redirected to the URL provided in the redirect_uri query parameter.
      // Check for authorization code in the URL
      this.route.queryParams.subscribe(params => {
        console.log(params);
        debugger
        const code = params['code'];
        if (code) {
          this.handleAuthCallback(code);
        } else {
          // If no code, initialize LinkedIn auth
          this.initLinkedIn();
        }
      });
    }
  }



  // Method to handle LinkedIn OAuth callback
  handleAuthCallback(code: string) {
    const clientId = '86f8dvb8egse2g';
    const clientSecret = '';
    const redirectUri = 'http://localhost:4200/linkedin-profile';
    //https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={{code}}&redirect_uri={{redirect_uri}}&client_id={{client_id}}&client_secret={{client_secret}}
    // Exchange authorization code for access token
    const tokenUrl = `https://www.linkedin.com/oauth/v2/accessToken`;
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', redirectUri);
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
    this.http.post(tokenUrl, body.toString(), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',

      }
    }).subscribe((response: any) => {
      this.accessToken = response.access_token;
      if (this.accessToken) {
        localStorage.setItem('linkedinAccessToken', this.accessToken); // Store token for later use
      }
      this.getUserProfile();
    });
  }

  // Method to initialize LinkedIn authentication
  initLinkedIn() {
    const clientId = '86f8dvb8egse2g';
    const clientSecret = '';
    const redirectUri = 'http://localhost:4200/linkedin-profile';
    // Scope &quot;r_emailaddress&quot; is not authorized for your application
    // Scope &quot;r_liteprofile&quot; is not authorized for your application
//     Scopes define what your app can do on a user's behalf.
// The OAuth consent screen will display descriptions to end users as they are seen below. Some variation may occur if your app has a custom OAuth experience.
// w_member_social
// Create, modify, and delete posts, comments, and reactions on your behalf
    const scope = 'r_liteprofile%20r_emailaddress'; // Define the required scope


    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    // Redirect user to LinkedIn for authorization
    window.location.href = authUrl;
  }

  getUserProfile() {
    const profileUrl = 'https://api.linkedin.com/v2/me';
    const headers = { Authorization: `Bearer ${this.accessToken}` };

    this.http.get(profileUrl, { headers }).subscribe(
      (data) => {
        this.userProfile = data;
        console.log(this.userProfile); // Log user profile data
      },
      error => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  searchProfile(profileUr: string) {
    console.log(profileUr);
    const username = profileUr.split('/').pop(); // Extract username from the URL
    const profileUrl = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${username})`;
    const headers = { Authorization: `Bearer ${this.accessToken}` };

    this.http.get(profileUrl, { headers }).subscribe(
      (data) => {
        this.userProfile = data;
        console.log(this.userProfile); // Log user profile data
      },
      error => {
        console.error('Error searching profile:', error);
      }
    );
  }
}

