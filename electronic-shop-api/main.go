package main

import (
	"log"
	"net/http"

	"electronic-shop-api/internal/config"
	router "electronic-shop-api/internal/delivery/http"
	"electronic-shop-api/internal/delivery/http/handlers"
	"electronic-shop-api/internal/repository"
	"electronic-shop-api/internal/usecase"
)

func main() {
	config.LoadConfig()

	db := config.InitDB()

	userRepo := repository.NewUserRepository(db)
	productRepo := repository.NewProductRepository(db)
	transactionRepo := repository.NewTransactionRepository(db)

	authUsecase := usecase.NewAuthUsecase(userRepo)
	productUsecase := usecase.NewProductUsecase(productRepo)
	transactionUsecase := usecase.NewTransactionUsecase(transactionRepo, productRepo)
	dashboardUsecase := usecase.NewDashboardUsecase(transactionRepo, productRepo)

	authHandler := handlers.NewAuthHandler(authUsecase)
	productHandler := handlers.NewProductHandler(productUsecase)
	transactionHandler := handlers.NewTransactionHandler(transactionUsecase)
	dashboardHandler := handlers.NewDashboardHandler(dashboardUsecase)

	r := router.SetupRouter(authHandler, productHandler, transactionHandler, dashboardHandler)

	log.Printf("Serveur démarré sur le port %s", config.AppConfig.Port)
	log.Fatal(http.ListenAndServe(":"+config.AppConfig.Port, r))
}
