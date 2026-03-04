package router

import (
	"electronic-shop-api/internal/delivery/http/handlers"
	"electronic-shop-api/internal/middleware"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRouter(
	authHandler *handlers.AuthHandler,
	productHandler *handlers.ProductHandler,
	transactionHandler *handlers.TransactionHandler,
	dashboardHandler *handlers.DashboardHandler,
) *mux.Router {
	router := mux.NewRouter()

	// Middleware CORS en premier
	router.Use(middleware.CorsMiddleware)

	// Health check
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API Electronic Shop est opérationnelle"))
	}).Methods("GET", "OPTIONS")

	// Routes d'authentification avec support OPTIONS
	router.HandleFunc("/register", authHandler.Register).Methods("POST", "OPTIONS")
	router.HandleFunc("/login", authHandler.Login).Methods("POST", "OPTIONS")

	// Routes publiques
	public := router.PathPrefix("/public").Subrouter()
	public.HandleFunc("/shop/{shopID}/products", productHandler.GetPublicProducts).Methods("GET", "OPTIONS")
	public.HandleFunc("/shop/{shopID}/product/{productID}/whatsapp", productHandler.GetWhatsAppLink).Methods("GET", "OPTIONS")

	// Routes API privées
	api := router.PathPrefix("/api").Subrouter()
	api.Use(middleware.AuthMiddleware)

	// Routes produits
	api.HandleFunc("/products", productHandler.GetProducts).Methods("GET", "OPTIONS")
	api.HandleFunc("/products", productHandler.CreateProduct).Methods("POST", "OPTIONS")
	api.HandleFunc("/products/{id}", productHandler.GetProduct).Methods("GET", "OPTIONS")
	api.HandleFunc("/products/{id}", productHandler.UpdateProduct).Methods("PUT", "OPTIONS")
	api.HandleFunc("/products/{id}", productHandler.DeleteProduct).Methods("DELETE", "OPTIONS")

	// Routes transactions
	api.HandleFunc("/transactions", transactionHandler.GetTransactions).Methods("GET", "OPTIONS")
	api.HandleFunc("/transactions", transactionHandler.CreateTransaction).Methods("POST", "OPTIONS")

	// Dashboard (SuperAdmin uniquement)
	api.HandleFunc("/reports/dashboard", dashboardHandler.GetDashboard).Methods("GET", "OPTIONS")

	return router
}
