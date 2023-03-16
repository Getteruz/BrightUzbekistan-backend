import { Router } from "express";
import * as newsController from "../modules/news/news.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateNewsDto, UpdateNewsDto } from "../modules/news/dto";
import { PermissionMiddleware } from "../modules/auth/middleware";

const router = Router();

router
  .get("/news", newsController.getAll)
  .get("/news/:id", newsController.getById)
  .get(
    "/news/archives",
    PermissionMiddleware("Доступ к архивам"),
    newsController.getByStateArchive,
  )
  .get(
    "/news/general_access",
    PermissionMiddleware("Общий доступ"),
    newsController.getByStateGeneral,
  )
  .get("/news/published", newsController.getByStatePublished)
  .get("/news/:key/:category")
  .post(
    "/news",
    PermissionMiddleware("Добавить новости"),
    DtoValidationMiddleware(CreateNewsDto),
    newsController.create,
  )
  .put(
    "/news/:id",
    DtoValidationMiddleware(UpdateNewsDto, true),
    // PermissionMiddleware("Редактировать новости"),
    newsController.update,
  )
  .delete(
    "/news/:id",
    // PermissionMiddleware("Удалить"),
    newsController.deleteData,
  )
  .patch("/news/archive/:id", newsController.updateStateArchive)
  .patch("/news/general_access/:id", newsController.updateStateGeneral)
  .patch("/news/publish_date/:id", newsController.updateDate);

module.exports = router;
