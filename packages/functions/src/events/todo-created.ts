import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@sst-cdk-context-bug/core/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
