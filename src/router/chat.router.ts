import { Router } from "express";
import * as chatController from "../modules/chat/chat.controller";
import * as messageController from "../modules/chat-message/chat-message.controller";

const router = Router();

router
  .get("/chat/:id", chatController.getById)
  .get("/message/:id", messageController.getById)
  .post("/message/:chatId", messageController.create)
  .delete("/message/:id", messageController.deleteData)
  .delete("/chat/:id", chatController.deleteData)
  .put("/message/:id", messageController.updateData)
  .post("/message", messageController.create);

module.exports = router;
