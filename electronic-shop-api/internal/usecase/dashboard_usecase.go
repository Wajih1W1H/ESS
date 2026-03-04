package usecase

import (
	"electronic-shop-api/internal/repository"
)

type DashboardUsecase struct {
	TransactionRepo *repository.TransactionRepository
	ProductRepo     *repository.ProductRepository
}

func NewDashboardUsecase(transactionRepo *repository.TransactionRepository, productRepo *repository.ProductRepository) *DashboardUsecase {
	return &DashboardUsecase{
		TransactionRepo: transactionRepo,
		ProductRepo:     productRepo,
	}
}

type DashboardResponse struct {
	TotalSales    float64 `json:"total_sales"`
	TotalExpenses float64 `json:"total_expenses"`
	NetProfit     float64 `json:"net_profit"`
	LowStockCount int     `json:"low_stock_count"`
}

func (u *DashboardUsecase) GetDashboard(shopID int) (*DashboardResponse, error) {
	totalSales, totalExpenses, err := u.TransactionRepo.GetTotals(shopID)
	if err != nil {
		return nil, err
	}

	lowStockCount, err := u.ProductRepo.GetLowStock(shopID, 5)
	if err != nil {
		return nil, err
	}

	return &DashboardResponse{
		TotalSales:    totalSales,
		TotalExpenses: totalExpenses,
		NetProfit:     totalSales - totalExpenses,
		LowStockCount: lowStockCount,
	}, nil
}
