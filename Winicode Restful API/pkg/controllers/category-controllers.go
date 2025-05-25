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

var NewCategory models.Category

func GetAllCategory(w http.ResponseWriter, r *http.Request) {
	newCategory := models.GetAllCategory()
	res, _ := json.Marshal(newCategory)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetCategoryById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	categoryId := vars["categoryId"]
	ID, err := strconv.ParseInt(categoryId, 10, 64)
	if err != nil {
		http.Error(w, "Invalid category ID", http.StatusBadRequest)
		return
	}
	categoryDetails, _ := models.GetCategoryById(ID)
	if err != nil {
		http.Error(w, "Category not found", http.StatusNotFound)
	}
	res, err := json.Marshal(categoryDetails)
	if err != nil {
		http.Error(w, "Error converting data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateCategory(w http.ResponseWriter, r *http.Request) {
	createCategory := &models.Category{}
	err := utils.ParseBody(r, createCategory)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	b := createCategory.CreateCategory()
	res, _ := json.Marshal(b)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	CategoryId := vars["categoryId"]
	Id, err := strconv.ParseInt(CategoryId, 0, 0)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	category := models.DeleteCategory(Id)
	res, _ := json.Marshal(category)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func UpdateCategory(w http.ResponseWriter, r *http.Request) {
	var updateCategory = &models.Category{}
	utils.ParseBody(r, updateCategory)
	vars := mux.Vars(r)
	categoryId := vars["categoryId"]
	Id, err := strconv.ParseInt(categoryId, 0, 0)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	categoryDetails, db := models.GetCategoryById(Id)
	if updateCategory.Name != "" {
		categoryDetails.Name = updateCategory.Name
	}
	db.Save(&categoryDetails)
	res, _ := json.Marshal(categoryDetails)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
