package routes

import (
	// "encoding/json"
	// "fmt"
	// "net/http"
	// "time"

	"github.com/gorilla/mux"
	"github.com/jmsrzk14/go_winicode/pkg/controllers"
)

func RegisterAdminRoutes(router *mux.Router) {
	router.HandleFunc("/admin/register", controllers.RegisterAdmin).Methods("POST")
	router.HandleFunc("/admin/login", controllers.AdminLogin).Methods("POST")
	router.HandleFunc("/admin/dashboard", controllers.AdminDashboard).Methods("GET")
}
