import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  timestamp,
  datetime,
  unique,
  serial,
  tinyint,
  text,
  float,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const albums = mysqlTable(
  "albums",
  {
    id: int("id").notNull(),
    name: varchar("name", { length: 32 }),
    cover: varchar("cover", { length: 32 }),
    artistId: int("artist_id").notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      albumsIdPk: primaryKey({ columns: [table.id], name: "albums_id_pk" }),
    };
  },
);

export const artists = mysqlTable(
  "artists",
  {
    id: serial("id").notNull(),
    name: varchar("name", { length: 32 }),
    username: varchar("username", { length: 18 }).notNull(),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      artistsIdPk: primaryKey({ columns: [table.id], name: "artists_id_pk" }),
      id: unique("id").on(table.id),
      artistsUsernameUnique: unique("artists_username_unique").on(
        table.username,
      ),
    };
  },
);

export const interactions = mysqlTable(
  "interactions",
  {
    id: serial("id").notNull(),
    userId: int("user_id"),
    songId: varchar("song_id", { length: 32 }),
    liked: tinyint("liked").default(0),
    playCount: int("play_count"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      interactionsIdPk: primaryKey({
        columns: [table.id],
        name: "interactions_id_pk",
      }),
      id: unique("id").on(table.id),
    };
  },
);

export const nigga = mysqlTable(
  "nigga",
  {
    id: serial("id").notNull(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    bts: text("bts").notNull(),
  },
  (table) => {
    return {
      niggaIdPk: primaryKey({ columns: [table.id], name: "nigga_id_pk" }),
      id: unique("id").on(table.id),
      categoryEmailUnique: unique("category_email_unique").on(table.email),
    };
  },
);

export const playlistSongs = mysqlTable(
  "playlist_songs",
  {
    id: serial("id").notNull(),
    playlistId: int("playlist_id"),
    songId: varchar("song_id", { length: 32 }),
  },
  (table) => {
    return {
      playlistSongsIdPk: primaryKey({
        columns: [table.id],
        name: "playlist_songs_id_pk",
      }),
      id: unique("id").on(table.id),
    };
  },
);

export const playlists = mysqlTable(
  "playlists",
  {
    id: serial("id").notNull(),
    name: varchar("name", { length: 256 }),
    userId: int("user_id"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    rules: text("rules"),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      playlistsIdPk: primaryKey({
        columns: [table.id],
        name: "playlists_id_pk",
      }),
      id: unique("id").on(table.id),
    };
  },
);

export const songs = mysqlTable(
  "songs",
  {
    id: serial("id").notNull(),
    albumId: int("album_id"),
    artistId: int("artist_id").notNull(),
    title: varchar("title", { length: 32 }),
    length: float("length"),
    track: int("track"),
    disc: int("disc"),
    lyrics: text("lyrics"),
    path: text("path"),
    mtime: int("mtime"),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      songsIdPk: primaryKey({ columns: [table.id], name: "songs_id_pk" }),
      id: unique("id").on(table.id),
    };
  },
);

export const users = mysqlTable(
  "users",
  {
    id: serial("id").notNull(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    preferences: text("preferences"),
    updatedAt: datetime("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      usersIdPk: primaryKey({ columns: [table.id], name: "users_id_pk" }),
      id: unique("id").on(table.id),
      usersEmailUnique: unique("users_email_unique").on(table.email),
    };
  },
);
