import { Router } from "express";
import * as newsController from "../modules/news/news.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateNewsDto, UpdateNewsDto } from "../modules/news/dto";
import { PermissionMiddleware } from "../modules/auth/middleware";
import { NewsQueryParserMiddleware } from "../infra/validation";

const router = Router();

router
  .get("/news", NewsQueryParserMiddleware, newsController.getAll)
  .get("/news/my-news", newsController.getMyNews)
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
  .get("/news/favorites", newsController.getBySavedCreator)
  .get("/single-news/:id", newsController.getById)
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
  .patch("/news/favorite/:id", newsController.updateStateFavorite)
  .patch("/news/publish_date/:id", newsController.updateDate);

module.exports = router;
