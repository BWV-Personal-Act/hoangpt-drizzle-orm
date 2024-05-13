CREATE TABLE `user` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` smallint NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `customer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`quantity` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `inventory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`customer_id` bigint unsigned NOT NULL,
	`order_date` datetime NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderDetail` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` bigint unsigned NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`quantity` int NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `orderDetail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`supplier_id` bigint unsigned NOT NULL,
	`category_id` bigint unsigned NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplier` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`contact_email` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` bigint unsigned NOT NULL,
	`createdUserName` varchar(10) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedBy` bigint unsigned NOT NULL,
	`updatedUserName` varchar(10) NOT NULL,
	CONSTRAINT `supplier_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `orderDetail` ADD CONSTRAINT `orderDetail_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderDetail` ADD CONSTRAINT `orderDetail_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderDetail` ADD CONSTRAINT `orderDetail_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `orderDetail` ADD CONSTRAINT `orderDetail_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_supplier_id_supplier_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `supplier` ADD CONSTRAINT `supplier_createdBy_user_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `supplier` ADD CONSTRAINT `supplier_updatedBy_user_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE restrict ON UPDATE restrict;