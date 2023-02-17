import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { format } from 'date-fns';
import { CreateTodoItem, TodoItem } from 'src/app/services/todo/todo';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent implements OnInit {
  model = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    deadline: new FormControl<Date | null>(null, Validators.required),
    createdAt: new FormControl<string>({value: '', disabled:true}),
    isDone: new FormControl<boolean>(false)
  });

  @ViewChild(MatInput) picker: MatInput;

  constructor(
    public dialogRef: MatDialogRef<AddTodoItemComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: {
      todoItem: TodoItem | undefined,
      listId: string
    }
  ) {}

  ngOnInit(): void {
    const todoItem = this.data.todoItem;

    if (todoItem) {
      this.model.patchValue({
        title: todoItem.title,
        description: todoItem.description,
        deadline: todoItem.deadline,
        createdAt: format(todoItem.createdAt, 'dd/MM/yyyy HH:mm'),
        isDone: todoItem.isDone
      });
    }
  }

  async save() {
    if (!this.model.valid) {
      this.model.markAllAsTouched();
      return;
    }

    const v = this.model.value;

    if (!this.data.todoItem) {
      await this.todoService.addTodoItem(this.data.listId, {
        title: v.title!,
        description: v.description!,
        deadline: v.deadline!,
        createdAt: new Date(),
        isDone: false
      });
    } else {
      await this.todoService.editTodoItem(
        this.data.listId,
        this.data.todoItem.id,
        v as Partial<CreateTodoItem>
      );
    }

    this.dialogRef.close();
  }
}
