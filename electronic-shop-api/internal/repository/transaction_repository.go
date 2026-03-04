package repository

import (
	"electronic-shop-api/internal/domain"

	"github.com/jmoiron/sqlx"
)

type TransactionRepository struct {
	DB *sqlx.DB
}

func NewTransactionRepository(db *sqlx.DB) *TransactionRepository {
	return &TransactionRepository{DB: db}
}

func (r *TransactionRepository) Create(transaction *domain.Transaction) error {
	query := `INSERT INTO transactions (type, product_id, quantity, amount, shop_id) 
              VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`
	return r.DB.QueryRow(query, transaction.Type, transaction.ProductID,
		transaction.Quantity, transaction.Amount, transaction.ShopID).Scan(&transaction.ID, &transaction.CreatedAt)
}

func (r *TransactionRepository) GetByShopID(shopID int) ([]domain.Transaction, error) {
	var transactions []domain.Transaction
	query := `SELECT * FROM transactions WHERE shop_id = $1 ORDER BY created_at DESC`
	err := r.DB.Select(&transactions, query, shopID)
	return transactions, err
}

func (r *TransactionRepository) GetTotals(shopID int) (float64, float64, error) {
	var totalSales, totalExpenses float64

	querySales := `SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE shop_id = $1 AND type = 'Sale'`
	err := r.DB.Get(&totalSales, querySales, shopID)
	if err != nil {
		return 0, 0, err
	}

	queryExpenses := `SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE shop_id = $1 AND type IN ('Expense', 'Withdrawal')`
	err = r.DB.Get(&totalExpenses, queryExpenses, shopID)
	if err != nil {
		return 0, 0, err
	}

	return totalSales, totalExpenses, nil
}

func (r *TransactionRepository) GetByDateRange(shopID int, startDate, endDate string) ([]domain.Transaction, error) {
	var transactions []domain.Transaction
	query := `SELECT * FROM transactions WHERE shop_id = $1 AND created_at BETWEEN $2 AND $3 ORDER BY created_at DESC`
	err := r.DB.Select(&transactions, query, shopID, startDate, endDate)
	return transactions, err
}
