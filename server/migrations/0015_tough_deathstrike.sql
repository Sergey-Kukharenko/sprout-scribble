ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_orderID_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "orderProduct" DROP COLUMN "orderID";