package domain

import "time"

type Product struct {
	ID            int       `db:"id" json:"id"`
	Name          string    `db:"name" json:"name"`
	Description   string    `db:"description" json:"description"`
	Category      string    `db:"category" json:"category"`
	PurchasePrice float64   `db:"purchase_price" json:"purchase_price,omitempty"`
	SellingPrice  float64   `db:"selling_price" json:"selling_price"`
	Stock         int       `db:"stock" json:"stock"`
	ImageURL      string    `db:"image_url" json:"image_url"`
	ShopID        int       `db:"shop_id" json:"shop_id"`
	CreatedAt     time.Time `db:"created_at" json:"created_at"`
}
