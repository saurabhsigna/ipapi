CREATE TABLE `albums` (
	`id` int NOT NULL,
	`name` varchar(32),
	`cover` varchar(32),
	`artist_id` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `albums_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `artists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(32),
	`username` varchar(18) NOT NULL,
	`image` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `artists_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `artists_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `interactions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`song_id` varchar(32),
	`liked` tinyint DEFAULT 0,
	`play_count` int,
	`createdAt` timestamp DEFAULT (now()),
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `interactions_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `nigga` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256) NOT NULL,
	`hashed_password` varchar(256) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`bts` text NOT NULL,
	CONSTRAINT `nigga_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `category_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `playlist_songs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`playlist_id` int,
	`song_id` varchar(32),
	CONSTRAINT `playlist_songs_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`user_id` int,
	`createdAt` timestamp DEFAULT (now()),
	`rules` text,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `playlists_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`album_id` int,
	`artist_id` int NOT NULL,
	`title` varchar(32),
	`length` float,
	`track` int,
	`disc` int,
	`lyrics` text,
	`path` text,
	`mtime` int,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `songs_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256) NOT NULL,
	`hashed_password` varchar(256) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`preferences` text,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
