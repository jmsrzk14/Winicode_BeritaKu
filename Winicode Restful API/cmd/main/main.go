package main

import (
    "fmt"
    "log"
    "net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmsrzk14/go_winicode/pkg/routes"
	"github.com/joho/godotenv"
)

func main() {
	r := mux.NewRouter()
	routes.RegisterNewsRoutes(r)
	routes.RegisterAdminRoutes(r)
	routes.RegisterCategoryRoutes(r)
	http.Handle("/", r)
	fmt.Println("Starting Server Localhost: 9010")
	log.Fatal(http.ListenAndServe("localhost:9010", r))
}

var jwtKey []byte

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	jwtKey = []byte(os.Getenv("JWT_SECRET_KEY"))
}