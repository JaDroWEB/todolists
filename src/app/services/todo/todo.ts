import { Expose, Transform, Type } from "class-transformer";

export type CreateTodoList = Omit<TodoList, 'id'>;
export type CreateTodoItem = Omit<TodoItem, 'id' | 'listId'>;

export class TodoList {
  @Expose()
  id: string;

  @Expose()
  userEmail: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

  @Expose()
  @Type(() => TodoItem)
  todoItems: TodoItem[]
}

export class TodoItem {
  @Expose()
  id: string;

  @Expose()
  listId: string;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => new Date(value))
  deadline: Date;

  @Expose()
  isDone: boolean;
}
