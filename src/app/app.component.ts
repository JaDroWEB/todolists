import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { resetStores } from '@datorama/akita';
import { AddTodolistComponent } from './components/main-page/todolist/add-todolist/add-todolist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog,
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) { }

  addTodoList() {
    this.dialog.open(AddTodolistComponent, {
      width: '400px'
    });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: document.location.origin
      }
    });

    resetStores();
  }

  refresh() {
    resetStores();
  }
}
