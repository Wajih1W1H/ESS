package usecase

import (
	"electronic-shop-api/internal/domain"
	"electronic-shop-api/internal/repository"
	"electronic-shop-api/internal/utils"
	"errors"
)

type AuthUsecase struct {
	UserRepo *repository.UserRepository
}

func NewAuthUsecase(userRepo *repository.UserRepository) *AuthUsecase {
	return &AuthUsecase{UserRepo: userRepo}
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
	ShopID   int    `json:"shop_id"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string      `json:"token"`
	User  domain.User `json:"user"`
}

func (u *AuthUsecase) Register(req RegisterRequest) (*domain.User, error) {
	existingUser, _ := u.UserRepo.GetByEmail(req.Email)
	if existingUser != nil {
		return nil, errors.New("cet email est déjà utilisé")
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, errors.New("erreur lors du hashage du mot de passe")
	}

	user := &domain.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
		Role:     domain.UserRole(req.Role),
		ShopID:   req.ShopID,
	}

	err = u.UserRepo.Create(user)
	if err != nil {
		return nil, errors.New("erreur lors de la création de l'utilisateur")
	}

	user.Password = ""
	return user, nil
}

func (u *AuthUsecase) Login(req LoginRequest) (*LoginResponse, error) {
	user, err := u.UserRepo.GetByEmail(req.Email)
	if err != nil {
		return nil, errors.New("email ou mot de passe incorrect")
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return nil, errors.New("email ou mot de passe incorrect")
	}

	token, err := utils.GenerateJWT(user.ID, user.Email, string(user.Role), user.ShopID)
	if err != nil {
		return nil, errors.New("erreur lors de la génération du token")
	}

	user.Password = ""
	return &LoginResponse{
		Token: token,
		User:  *user,
	}, nil
}
