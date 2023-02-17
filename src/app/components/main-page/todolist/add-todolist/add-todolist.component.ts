import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService, User } from '@auth0/auth0-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { format } from 'date-fns';
import { TodoList } from 'src/app/services/todo/todo';
import { TodoService } from 'src/app/services/todo/todo.service';

@UntilDestroy()
@Component({
  selector: 'app-add-todolist',
  templateUrl: './add-todolist.component.html',
  styleUrls: ['./add-todolist.component.scss']
})
export class AddTodolistComponent implements OnInit {
  user: User | null | undefined;
  model = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    createdAt: new FormControl<string>({ value: '', disabled: true }),
  });

  constructor(
    public dialogRef: MatDialogRef<AddTodolistComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public todoList: TodoList | undefined,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!!this.todoList) {
      this.model.patchValue({
        name: this.todoList?.name,
        createdAt: format(this.todoList?.createdAt!, 'dd/MM/yyyy HH:mm')
      });
    } else {
      this.authService.user$
        .pipe(untilDestroyed(this))
        .subscribe(user => (this.user = user));
    }
  }

  async save() {
    if (!this.model.valid) {
      this.model.markAllAsTouched();
      return;
    }

    if (!this.todoList) {
      await this.todoService.addList({
        name: this.model.controls.name.value!,
        userEmail: this.user?.email!,
        createdAt: new Date(),
        todoItems: []
      });
    } else {
      await this.todoService.editList(this.todoList?.id!, {
        name: this.model.controls.name.value!
      });
    }

    this.dialogRef.close();
  }
}
