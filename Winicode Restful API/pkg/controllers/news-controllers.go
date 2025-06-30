package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"os"
	"path/filepath"

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
	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, "Unable to parse multipart form", http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("Image")
	if err != nil {
		http.Error(w, "Image upload failed", http.StatusBadRequest)
		return
	}
	defer file.Close()

	publicDir := "public"
	if _, err := os.Stat(publicDir); os.IsNotExist(err) {
		err := os.MkdirAll(publicDir, os.ModePerm)
		if err != nil {
			http.Error(w, "Failed to create public directory", http.StatusInternalServerError)
			return
		}
	}

	dstPath := filepath.Join(publicDir, handler.Filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		http.Error(w, "Failed to save image", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Failed to copy image to server", http.StatusInternalServerError)
		return
	}

	title := r.FormValue("Title")
	date := r.FormValue("Date")
	description := r.FormValue("Description")
	kategoriIDStr := r.FormValue("KategoriID")
	kategoriIDUint64, err := strconv.ParseUint(kategoriIDStr, 10, 32)
	if err != nil {
		http.Error(w, "Invalid KategoriID", http.StatusBadRequest)
		return
	}

	createNews := models.News{
		Title:       title,
		Date:        date,
		Description: description,
		KategoriID:  uint(kategoriIDUint64),
		Image:       handler.Filename,
	}

	result := createNews.CreateNews()

	res, _ := json.Marshal(result)
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
