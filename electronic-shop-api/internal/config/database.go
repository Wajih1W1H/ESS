package config

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func InitDB() *sqlx.DB {
	connStr := "host=" + AppConfig.DBHost +
		" port=" + AppConfig.DBPort +
		" user=" + AppConfig.DBUser +
		" password=" + AppConfig.DBPassword +
		" dbname=" + AppConfig.DBName +
		" sslmode=disable"

	db, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatal("Erreur de connexion à la base de données:", err)
	}

	log.Println("Connexion à PostgreSQL établie avec succès")
	createTables(db)
	return db
}

func createTables(db *sqlx.DB) {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS shops (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            active BOOLEAN DEFAULT true,
            whatsapp_number VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
		`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) NOT NULL,
            shop_id INTEGER REFERENCES shops(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
		`CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            category VARCHAR(50),
            purchase_price DECIMAL(10,2),
            selling_price DECIMAL(10,2) NOT NULL,
            stock INTEGER DEFAULT 0,
            image_url TEXT,
            shop_id INTEGER REFERENCES shops(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
		`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            type VARCHAR(20) NOT NULL,
            product_id INTEGER REFERENCES products(id),
            quantity INTEGER DEFAULT 0,
            amount DECIMAL(10,2) NOT NULL,
            shop_id INTEGER REFERENCES shops(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
	}

	for _, q := range queries {
		_, err := db.Exec(q)
		if err != nil {
			log.Printf("Erreur: %v", err)
		}
	}

	var count int
	db.Get(&count, "SELECT COUNT(*) FROM users")
	if count == 0 {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		db.Exec(`INSERT INTO users (name, email, password, role, shop_id) 
                 VALUES ('Super Admin', 'admin@shop.com', $1, 'SuperAdmin', 1)`, string(hashedPassword))
		log.Println("Utilisateur SuperAdmin créé: admin@shop.com / admin123")
	}
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
