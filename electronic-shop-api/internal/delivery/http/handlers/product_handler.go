package handlers

import (
	"electronic-shop-api/internal/domain"
	"electronic-shop-api/internal/usecase"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type ProductHandler struct {
	ProductUsecase *usecase.ProductUsecase
}

func NewProductHandler(productUsecase *usecase.ProductUsecase) *ProductHandler {
	return &ProductHandler{ProductUsecase: productUsecase}
}

func (h *ProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product domain.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	shopID := r.Context().Value("shop_id").(int)
	userRole := r.Context().Value("user_role").(string)
	product.ShopID = shopID

	if err := h.ProductUsecase.Create(&product, userRole); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(product)
}

func (h *ProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	shopID := r.Context().Value("shop_id").(int)
	userRole := r.Context().Value("user_role").(string)

	products, err := h.ProductUsecase.GetByShopID(shopID, userRole)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func (h *ProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID invalide", http.StatusBadRequest)
		return
	}

	shopID := r.Context().Value("shop_id").(int)
	userRole := r.Context().Value("user_role").(string)

	product, err := h.ProductUsecase.GetByID(id, shopID, userRole)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func (h *ProductHandler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID invalide", http.StatusBadRequest)
		return
	}

	var product domain.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, "Requête invalide", http.StatusBadRequest)
		return
	}

	product.ID = id
	shopID := r.Context().Value("shop_id").(int)
	userRole := r.Context().Value("user_role").(string)

	if err := h.ProductUsecase.Update(&product, shopID, userRole); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func (h *ProductHandler) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID invalide", http.StatusBadRequest)
		return
	}

	shopID := r.Context().Value("shop_id").(int)

	if err := h.ProductUsecase.Delete(id, shopID); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProductHandler) GetPublicProducts(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	shopID, err := strconv.Atoi(vars["shopID"])
	if err != nil {
		http.Error(w, "ID de boutique invalide", http.StatusBadRequest)
		return
	}

	products, err := h.ProductUsecase.GetPublicProducts(shopID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func (h *ProductHandler) GetWhatsAppLink(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	shopID, err := strconv.Atoi(vars["shopID"])
	if err != nil {
		http.Error(w, "ID de boutique invalide", http.StatusBadRequest)
		return
	}

	productID, err := strconv.Atoi(vars["productID"])
	if err != nil {
		http.Error(w, "ID de produit invalide", http.StatusBadRequest)
		return
	}

	whatsappLink := "https://wa.me/?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20le%20produit%20" + strconv.Itoa(productID) + "%20de%20la%20boutique%20" + strconv.Itoa(shopID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"whatsapp_link": whatsappLink,
	})
}
