import { TypeOrmDataSource } from "../../config";

import { NewsService } from "./news.service";
import { News } from "./news.entity";
import { adminService } from "../admin";
import { newsLanguageService } from "../news-language";
import { categoryService } from "../category";
import { chatService } from "../chat";

export const repository = TypeOrmDataSource.getRepository(News);

export const newsService = new NewsService(
  repository,
  newsLanguageService,
  adminService,
  categoryService,
  TypeOrmDataSource,
  chatService,
);
