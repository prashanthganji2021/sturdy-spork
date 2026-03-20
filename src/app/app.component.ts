import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionService, ConnectionServiceOptions, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    const options: ConnectionServiceOptions = {}; // Replace {} with the appropriate options
    this.subscription.add(
      this.connectionService.monitor(options).pipe(
        tap((newState: ConnectionState) => {
          this.currentState = newState;
    
          if (this.currentState.hasNetworkConnection) {
            this.status = 'ONLINE';
          } else {
            this.status = 'OFFLINE';
          }
          console.log(this.status )
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}