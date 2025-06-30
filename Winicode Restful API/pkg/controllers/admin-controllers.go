package controllers

import (
	"encoding/json"
	"net/http"
	"time"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"github.com/jinzhu/gorm"

	"github.com/jmsrzk14/go_winicode/pkg/models"
	"github.com/jmsrzk14/go_winicode/pkg/config"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET_KEY"))
var db *gorm.DB

func SetDatabase(database *gorm.DB) {
	db = database
}

type TokenResponse struct {
	Token string `json:"token"`
}

func RegisterAdmin(w http.ResponseWriter, r *http.Request) {
	db := config.GetDB()

	if db == nil {
		http.Error(w, "Database connection is not initialized", http.StatusInternalServerError)
		return
	}

	var admin models.Admin
	err := json.NewDecoder(r.Body).Decode(&admin)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if err := admin.HashPassword(); err != nil {
		http.Error(w, "Could not hash password", http.StatusInternalServerError)
		return
	}

	result := db.Create(&admin)
	if result.Error != nil {
		http.Error(w, "Could not register admin", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Admin registered successfully"})
}


func AdminLogin(w http.ResponseWriter, r *http.Request) {
	db := config.GetDB()

	if db == nil {
		http.Error(w, "Database connection is not initialized", http.StatusInternalServerError)
		return
	}

	var loginData models.Admin
	var admin models.Admin

	err := json.NewDecoder(r.Body).Decode(&loginData)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	result := db.Where("email = ?", loginData.Email).First(&admin)
	if result.Error != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(loginData.Password)); err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(expirationTime),
		Issuer:    "go_admin",
		Subject:   admin.Email,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(TokenResponse{Token: tokenString})
}

func AdminDashboard(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Hapus "Bearer " jika ada
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}

	// Validasi token
	claims := &jwt.RegisteredClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Jika valid, tampilkan dashboard
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Welcome to Admin Dashboard!")
}