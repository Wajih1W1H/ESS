package domain

import "time"

type UserRole string

const (
	RoleSuperAdmin UserRole = "SuperAdmin"
	RoleAdmin      UserRole = "Admin"
)

type User struct {
	ID        int       `db:"id" json:"id"`
	Name      string    `db:"name" json:"name"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"-"`
	Role      UserRole  `db:"role" json:"role"`
	ShopID    int       `db:"shop_id" json:"shop_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
