package utils

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
)

type (
	Response struct {
		Data map[string]interface{} `json:"data"`
	}
)

func HttpRequest(url, method string, kukis []*http.Cookie) (Response, error) {
	client := &http.Client{}

	request, err := http.NewRequest(method, url, nil)
	if err != nil {
		return Response{}, err
	}
	request.Header.Set("Content-Type", "application/json")
	for _, kuki := range kukis {
		request.AddCookie(kuki)
	}

	response, err := client.Do(request)
	if err != nil {
		return Response{}, err
	}
	defer response.Body.Close()

	responseBody, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return Response{}, err
	}

	if response.StatusCode != http.StatusOK {
		return Response{}, errors.New("404 not found")
	}

	var result Response
	json.Unmarshal(responseBody, &result)

	return result, nil
}
