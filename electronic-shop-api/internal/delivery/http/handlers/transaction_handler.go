package handlers

import (
	"electronic-shop-api/internal/domain"
	"electronic-shop-api/internal/usecase"
	"encoding/json"
	"net/http"
)

type TransactionHandler struct {
	TransactionUsecase *usecase.TransactionUsecase
}

func NewTransactionHandler(transactionUsecase *usecase.TransactionUsecase) *TransactionHandler {
	return &TransactionHandler{TransactionUsecase: transactionUsecase}
}

func (h *TransactionHandler) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var transaction domain.Transaction
	if err := json.NewDecoder(r.Body).Decode(&transaction); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	shopID := r.Context().Value("shop_id").(int)
	transaction.ShopID = shopID

	if err := h.TransactionUsecase.Create(&transaction); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(transaction)
}

func (h *TransactionHandler) GetTransactions(w http.ResponseWriter, r *http.Request) {
	shopID := r.Context().Value("shop_id").(int)

	transactions, err := h.TransactionUsecase.GetByShopID(shopID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}
