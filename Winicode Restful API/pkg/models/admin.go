package models

import (
    "github.com/jinzhu/gorm"
	"github.com/jmsrzk14/go_winicode/pkg/config"
	"golang.org/x/crypto/bcrypt"
)

type Admin struct {
	gorm.Model
	Name       	string `json:"name"`
	Email       string `json:"email"`
	Username 	string `json:"username"`
	Password 	string `json:"password"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Admin{})
}

func (b *Admin) CreateAdmin() *Admin {
	db.NewRecord(b)
	db.Create(&b)
	return b
}

func GetAllAdmin() []Admin {
	var Admin []Admin
	db.Find(&Admin)
	return Admin
}

func GetAdminById(id int64) (*Admin, *gorm.DB) {
	var getAdmin Admin
	db := db.Where("ID=?", id).Find(&getAdmin)
	return &getAdmin, db
}

func DeleteAdmin(id int64) Admin {
	var admin Admin
    db.Where("ID=?", id).Delete(admin)
    return admin
}

func (admin *Admin) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	admin.Password = string(hashedPassword)
	return nil
}

func (admin *Admin) VerifyPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(password))
}
