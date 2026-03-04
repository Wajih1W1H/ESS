package middleware

import (
	"context"
	"electronic-shop-api/internal/utils"
	"net/http"
	"strings"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Token d'authentification requis", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, "Format d'autorisation invalide. Utilisez Bearer <token>", http.StatusUnauthorized)
			return
		}

		claims, err := utils.ValidateJWT(parts[1])
		if err != nil {
			http.Error(w, "Token invalide ou expiré", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "user_id", claims.UserID)
		ctx = context.WithValue(ctx, "user_email", claims.Email)
		ctx = context.WithValue(ctx, "user_role", claims.Role)
		ctx = context.WithValue(ctx, "shop_id", claims.ShopID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
