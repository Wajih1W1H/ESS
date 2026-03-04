package usecase

import (
	"electronic-shop-api/internal/domain"
	"electronic-shop-api/internal/repository"
	"errors"
)

type TransactionUsecase struct {
	TransactionRepo *repository.TransactionRepository
	ProductRepo     *repository.ProductRepository
}

func NewTransactionUsecase(transactionRepo *repository.TransactionRepository, productRepo *repository.ProductRepository) *TransactionUsecase {
	return &TransactionUsecase{
		TransactionRepo: transactionRepo,
		ProductRepo:     productRepo,
	}
}

func (u *TransactionUsecase) Create(transaction *domain.Transaction) error {
	if transaction.Amount <= 0 {
		return errors.New("le montant doit être supérieur à 0")
	}
	if transaction.Quantity < 0 {
		return errors.New("la quantité ne peut pas être négative")
	}

	if transaction.Type == domain.TypeSale {
		if transaction.ProductID == nil {
			return errors.New("ID produit requis pour une vente")
		}

		product, err := u.ProductRepo.GetByID(*transaction.ProductID)
		if err != nil {
			return errors.New("produit non trouvé")
		}

		if product.ShopID != transaction.ShopID {
			return errors.New("ce produit n'appartient pas à votre boutique")
		}

		if product.Stock < transaction.Quantity {
			return errors.New("stock insuffisant")
		}

		err = u.ProductRepo.UpdateStock(*transaction.ProductID, transaction.ShopID, transaction.Quantity)
		if err != nil {
			return errors.New("erreur lors de la mise à jour du stock")
		}

		if transaction.Amount == 0 {
			transaction.Amount = float64(transaction.Quantity) * product.SellingPrice
		}
	}

	return u.TransactionRepo.Create(transaction)
}

func (u *TransactionUsecase) GetByShopID(shopID int) ([]domain.Transaction, error) {
	return u.TransactionRepo.GetByShopID(shopID)
}
