package routes

import (
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmsrzk14/go_winicode/pkg/controllers"
)

var RegisterCategoryRoutes = func(router *mux.Router) {
	router.HandleFunc("/category/create", controllers.CreateCategory).Methods("POST")
	router.HandleFunc("/category/", controllers.GetAllCategory).Methods("GET")
	router.HandleFunc("/category/{categoryId}", controllers.GetCategoryById).Methods("GET")
	router.HandleFunc("/category/{categoryId}", controllers.UpdateCategory).Methods("PUT")
	router.HandleFunc("/category/{categoryId}", controllers.DeleteCategory).Methods("DELETE")
}