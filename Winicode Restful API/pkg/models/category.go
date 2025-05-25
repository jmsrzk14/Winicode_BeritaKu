package models

import (
	"github.com/jinzhu/gorm"
	"github.com/jmsrzk14/go_winicode/pkg/config"
)

var dbc *gorm.DB

type Category struct {
	gorm.Model
	Name string `json:"name"`
}

func init() {
	config.Connect()
	dbc = config.GetDB()
	dbc.AutoMigrate(&Category{})
}

func (b *Category) CreateCategory() *Category {
	dbc.NewRecord(b)
	dbc.Create(&b)
	return b
}

func GetAllCategory() []Category {
	var Category []Category
	dbc.Find(&Category)
	return Category
}

func GetCategoryById(id int64) (*Category, *gorm.DB) {
	var getCategory Category
	dbc := dbc.Where("ID=?", id).Find(&getCategory)
	return &getCategory, dbc
}

func DeleteCategory(id int64) Category {
	var categorys Category
	dbc.Where("ID=?", id).Delete(categorys)
	return categorys
}
