package repository

import (
	"database/sql"
	"electronic-shop-api/internal/domain"

	"github.com/jmoiron/sqlx"
)

type ProductRepository struct {
	DB *sqlx.DB
}

func NewProductRepository(db *sqlx.DB) *ProductRepository {
	return &ProductRepository{DB: db}
}

func (r *ProductRepository) Create(product *domain.Product) error {
	query := `INSERT INTO products (name, description, category, purchase_price, selling_price, stock, image_url, shop_id) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, created_at`
	return r.DB.QueryRow(query, product.Name, product.Description, product.Category,
		product.PurchasePrice, product.SellingPrice, product.Stock, product.ImageURL, product.ShopID).Scan(&product.ID, &product.CreatedAt)
}

func (r *ProductRepository) GetByID(id int) (*domain.Product, error) {
	var product domain.Product
	query := `SELECT * FROM products WHERE id = $1`
	err := r.DB.Get(&product, query, id)
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *ProductRepository) GetByShopID(shopID int) ([]domain.Product, error) {
	var products []domain.Product
	query := `SELECT * FROM products WHERE shop_id = $1 ORDER BY created_at DESC`
	err := r.DB.Select(&products, query, shopID)
	return products, err
}

func (r *ProductRepository) Update(product *domain.Product) error {
	query := `UPDATE products SET name=$1, description=$2, category=$3, purchase_price=$4, 
              selling_price=$5, stock=$6, image_url=$7 WHERE id=$8 AND shop_id=$9`
	_, err := r.DB.Exec(query, product.Name, product.Description, product.Category,
		product.PurchasePrice, product.SellingPrice, product.Stock, product.ImageURL, product.ID, product.ShopID)
	return err
}

func (r *ProductRepository) Delete(id, shopID int) error {
	query := `DELETE FROM products WHERE id = $1 AND shop_id = $2`
	_, err := r.DB.Exec(query, id, shopID)
	return err
}

func (r *ProductRepository) GetPublicByShopID(shopID int) ([]domain.Product, error) {
	var products []domain.Product
	query := `SELECT id, name, description, category, selling_price, stock, image_url, shop_id, created_at 
              FROM products WHERE shop_id = $1 ORDER BY created_at DESC`
	err := r.DB.Select(&products, query, shopID)
	return products, err
}

func (r *ProductRepository) GetLowStock(shopID int, threshold int) (int, error) {
	var count int
	query := `SELECT COUNT(*) FROM products WHERE shop_id = $1 AND stock < $2 AND stock > 0`
	err := r.DB.Get(&count, query, shopID, threshold)
	return count, err
}

func (r *ProductRepository) UpdateStock(id, shopID int, quantity int) error {
	query := `UPDATE products SET stock = stock - $1 WHERE id = $2 AND shop_id = $3 AND stock >= $1`
	result, err := r.DB.Exec(query, quantity, id, shopID)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}
