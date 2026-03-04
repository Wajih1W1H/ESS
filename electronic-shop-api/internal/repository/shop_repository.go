package repository

import (
	"electronic-shop-api/internal/domain"

	"github.com/jmoiron/sqlx"
)

type ShopRepository struct {
	DB *sqlx.DB
}

func NewShopRepository(db *sqlx.DB) *ShopRepository {
	return &ShopRepository{DB: db}
}

func (r *ShopRepository) Create(shop *domain.Shop) error {
	query := `INSERT INTO shops (name, whatsapp_number) VALUES ($1, $2) RETURNING id, created_at`
	return r.DB.QueryRow(query, shop.Name, shop.WhatsAppNumber).Scan(&shop.ID, &shop.CreatedAt)
}

func (r *ShopRepository) GetByID(id int) (*domain.Shop, error) {
	var shop domain.Shop
	query := `SELECT * FROM shops WHERE id = $1`
	err := r.DB.Get(&shop, query, id)
	if err != nil {
		return nil, err
	}
	return &shop, nil
}

func (r *ShopRepository) UpdateWhatsApp(id int, whatsapp string) error {
	query := `UPDATE shops SET whatsapp_number = $1 WHERE id = $2`
	_, err := r.DB.Exec(query, whatsapp, id)
	return err
}

func (r *ShopRepository) GetAll() ([]domain.Shop, error) {
	var shops []domain.Shop
	query := `SELECT * FROM shops ORDER BY id`
	err := r.DB.Select(&shops, query)
	return shops, err
}
