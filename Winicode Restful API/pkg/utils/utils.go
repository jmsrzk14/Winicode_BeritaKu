package utils

import (
    "encoding/json"
    "io"
	"net/http"
)

func ParseBody(r *http.Request, x interface{}) error {
	if r.Body == nil {
		return io.EOF 
	}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(x)
	if err != nil {
		return err
	}
	return nil
}