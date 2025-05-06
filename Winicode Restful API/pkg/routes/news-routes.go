package routes

import (
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmsrzk14/go_winicode/pkg/controllers"
)

var RegisterNewsRoutes = func(router *mux.Router) {
	router.HandleFunc("/news/", controllers.CreateNews).Methods("POST")
	router.HandleFunc("/news/", controllers.GetAllNews).Methods("GET")
	router.HandleFunc("/news/{newsId}", controllers.GetNewsById).Methods("GET")
	router.HandleFunc("/news/{newsId}", controllers.UpdateNews).Methods("PUT")
	router.HandleFunc("/news/{newsId}", controllers.DeleteNews).Methods("DELETE")

}
