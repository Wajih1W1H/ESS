package usecase

import (
	"electronic-shop-api/internal/domain"
	"electronic-shop-api/internal/repository"
	"errors"
)

type ProductUsecase struct {
	ProductRepo *repository.ProductRepository
}

func NewProductUsecase(productRepo *repository.ProductRepository) *ProductUsecase {
	return &ProductUsecase{ProductRepo: productRepo}
}

func (u *ProductUsecase) Create(product *domain.Product, userRole string) error {
	if product.Name == "" {
		return errors.New("le nom du produit est requis")
	}
	if product.SellingPrice <= 0 {
		return errors.New("le prix de vente doit être supérieur à 0")
	}
	if product.Stock < 0 {
		return errors.New("le stock ne peut pas être négatif")
	}

	if userRole == "Admin" {
		product.PurchasePrice = 0
	}
	return u.ProductRepo.Create(product)
}

func (u *ProductUsecase) GetByShopID(shopID int, userRole string) ([]domain.Product, error) {
	products, err := u.ProductRepo.GetByShopID(shopID)
	if err != nil {
		return nil, err
	}

	if userRole == "Admin" {
		for i := range products {
			products[i].PurchasePrice = 0
		}
	}

	return products, nil
}

func (u *ProductUsecase) GetByID(id, shopID int, userRole string) (*domain.Product, error) {
	product, err := u.ProductRepo.GetByID(id)
	if err != nil {
		return nil, errors.New("produit non trouvé")
	}

	if product.ShopID != shopID {
		return nil, errors.New("produit non trouvé dans cette boutique")
	}

	if userRole == "Admin" {
		product.PurchasePrice = 0
	}

	return product, nil
}

func (u *ProductUsecase) Update(product *domain.Product, shopID int, userRole string) error {
	if product.ID == 0 {
		return errors.New("ID du produit requis")
	}

	existing, err := u.ProductRepo.GetByID(product.ID)
	if err != nil {
		return errors.New("produit non trouvé")
	}

	if existing.ShopID != shopID {
		return errors.New("accès non autorisé à ce produit")
	}

	product.ShopID = shopID

	if userRole == "Admin" {
		product.PurchasePrice = existing.PurchasePrice
	}

	return u.ProductRepo.Update(product)
}

func (u *ProductUsecase) Delete(id, shopID int) error {
	return u.ProductRepo.Delete(id, shopID)
}

func (u *ProductUsecase) GetPublicProducts(shopID int) ([]domain.Product, error) {
	products, err := u.ProductRepo.GetPublicByShopID(shopID)
	if err != nil {
		return nil, err
	}

	for i := range products {
		products[i].PurchasePrice = 0
		if products[i].Stock == 0 {
			products[i].Name = products[i].Name + " (Rupture de stock)"
		}
	}

	return products, nil
}
