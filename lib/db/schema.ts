import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  num: text("num").notNull(),
  title: text("title").notNull(),
  impact: text("impact").notNull(),
  desc: text("desc").notNull(),
  tags: text("tags").array().notNull(),
  image: text("image").notNull(),
  imageAlt: text("imageAlt").notNull(),
  liveUrl: text("liveUrl"),
  githubUrl: text("githubUrl"),
});
