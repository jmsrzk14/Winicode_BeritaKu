package models

import (
    "github.com/jinzhu/gorm"
	"github.com/jmsrzk14/go_winicode/pkg/config"
)

var db *gorm.DB

type News struct {
	gorm.Model
	Title       string `json:"title"`
	Date 		string `json:"date"`
	Image 		string `json:"image"`
	Description	string `json:"description"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&News{})
}

func (b *News) CreateNews() *News {
	db.NewRecord(b)
	db.Create(&b)
	return b
}

func GetAllNews() []News {
	var News []News
	db.Find(&News)
	return News
}

func GetNewsById(id int64) (*News, *gorm.DB) {
	var getNews News
	db := db.Where("ID=?", id).Find(&getNews)
	return &getNews, db
}

func DeleteNews(id int64) News {
	var news News
    db.Where("ID=?", id).Delete(news)
    return news
}