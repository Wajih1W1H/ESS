package handlers

import (
	"electronic-shop-api/internal/usecase"
	"encoding/json"
	"net/http"
)

type DashboardHandler struct {
	DashboardUsecase *usecase.DashboardUsecase
}

func NewDashboardHandler(dashboardUsecase *usecase.DashboardUsecase) *DashboardHandler {
	return &DashboardHandler{DashboardUsecase: dashboardUsecase}
}

func (h *DashboardHandler) GetDashboard(w http.ResponseWriter, r *http.Request) {
	shopID := r.Context().Value("shop_id").(int)
	userRole := r.Context().Value("user_role").(string)

	if userRole != "SuperAdmin" {
		http.Error(w, "Accès réservé aux SuperAdmin", http.StatusForbidden)
		return
	}

	dashboard, err := h.DashboardUsecase.GetDashboard(shopID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dashboard)
}
