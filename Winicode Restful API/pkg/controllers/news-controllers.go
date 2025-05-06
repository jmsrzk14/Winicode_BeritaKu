package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmsrzk14/go_winicode/pkg/models"
	"github.com/jmsrzk14/go_winicode/pkg/utils"
)

var NewNews models.News

func GetAllNews(w http.ResponseWriter, r *http.Request) {
	newNews := models.GetAllNews()
	res, _ := json.Marshal(newNews)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetNewsById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	newsId := vars["newsId"]
	ID, err := strconv.ParseInt(newsId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid news ID", http.StatusBadRequest)
		return
	}
	newsDetails, _ := models.GetNewsById(ID)
	if err != nil {
		http.Error(w, "News not found", http.StatusNotFound)
	}
	res, err := json.Marshal(newsDetails)
	if err != nil {
		http.Error(w, "Error converting data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateNews(w http.ResponseWriter, r *http.Request) {
	createNews := &models.News{}
	err := utils.ParseBody(r, createNews)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	b := createNews.CreateNews()
	res, _ := json.Marshal(b)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteNews(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	NewsId := vars["newsId"]
	Id, err := strconv.ParseInt(NewsId, 0, 0)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	news := models.DeleteNews(Id)
	res, _ := json.Marshal(news)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func UpdateNews(w http.ResponseWriter, r *http.Request) {
	var updateNews = &models.News{}
	utils.ParseBody(r, updateNews)
	vars := mux.Vars(r)
	newsId := vars["newsId"]
	Id, err := strconv.ParseInt(newsId, 0, 0)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	newsDetails, db := models.GetNewsById(Id)
	if updateNews.Title != "" {
		newsDetails.Title = updateNews.Title
	}
	if updateNews.Date != "" {
		newsDetails.Date = updateNews.Date
	}
	if updateNews.Image != "" {
		newsDetails.Image = updateNews.Image
	}
	if updateNews.Description != "" {
		newsDetails.Description = updateNews.Description
	}
	db.Save(&newsDetails)
	res, _ := json.Marshal(newsDetails)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
