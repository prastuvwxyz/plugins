package controllers

import (
	"fmt"
	"net/http"

	"github.com/prastuvwxyz/plugins/utils"
)

func getGoplayEventDetailBySlugAndEnv(slug, env string) (string, error) {
	var url string
	if env == "g" {
		url = fmt.Sprintf(GOPLAY_EVENT_DETAIL_API_URL, HOST_INTEGRATION, slug)
	} else {
		url = fmt.Sprintf(GOPLAY_EVENT_DETAIL_API_URL, HOST_PRODUCTION, slug)
	}

	result, err := utils.HttpRequest(url, http.MethodGet, []*http.Cookie{
		{Name: "gp_fgp", Value: "0", HttpOnly: false},
	})
	if err != nil {
		return "", err
	}

	return result.Data["guard_url"].(string), nil
}
