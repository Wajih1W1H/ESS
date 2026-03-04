package repository

import (
	"electronic-shop-api/internal/domain"

	"github.com/jmoiron/sqlx"
)

type UserRepository struct {
	DB *sqlx.DB
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (r *UserRepository) Create(user *domain.User) error {
	query := `INSERT INTO users (name, email, password, role, shop_id) 
              VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`
	return r.DB.QueryRow(query, user.Name, user.Email, user.Password, user.Role, user.ShopID).Scan(&user.ID, &user.CreatedAt)
}

func (r *UserRepository) GetByEmail(email string) (*domain.User, error) {
	var user domain.User
	query := `SELECT * FROM users WHERE email = $1`
	err := r.DB.Get(&user, query, email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) GetByShopID(shopID int) ([]domain.User, error) {
	var users []domain.User
	query := `SELECT * FROM users WHERE shop_id = $1 ORDER BY created_at DESC`
	err := r.DB.Select(&users, query, shopID)
	return users, err
}

func (r *UserRepository) GetByID(id int) (*domain.User, error) {
	var user domain.User
	query := `SELECT * FROM users WHERE id = $1`
	err := r.DB.Get(&user, query, id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
