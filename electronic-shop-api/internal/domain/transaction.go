package domain

import "time"

type TransactionType string

const (
	TypeSale       TransactionType = "Sale"
	TypeExpense    TransactionType = "Expense"
	TypeWithdrawal TransactionType = "Withdrawal"
)

type Transaction struct {
	ID        int             `db:"id" json:"id"`
	Type      TransactionType `db:"type" json:"type"`
	ProductID *int            `db:"product_id" json:"product_id,omitempty"`
	Quantity  int             `db:"quantity" json:"quantity"`
	Amount    float64         `db:"amount" json:"amount"`
	ShopID    int             `db:"shop_id" json:"shop_id"`
	CreatedAt time.Time       `db:"created_at" json:"created_at"`
}
