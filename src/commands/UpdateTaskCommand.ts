import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class UpdateTaskCommand extends AbstractCommand {
  private oldTask: Task | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const current = this.taskList.getTask(this.taskId);
    if (!current) return;

    this.oldTask = { ...current };
    this.taskList.updateTask(this.taskId, this.updates);
  }

  undo(): void {
    if (this.oldTask) {
      this.taskList.updateTask(this.taskId, this.oldTask);
    }
  }
}
