package domain

import "time"

type Shop struct {
	ID             int       `db:"id" json:"id"`
	Name           string    `db:"name" json:"name"`
	Active         bool      `db:"active" json:"active"`
	WhatsAppNumber string    `db:"whatsapp_number" json:"whatsapp_number"`
	CreatedAt      time.Time `db:"created_at" json:"created_at"`
}
