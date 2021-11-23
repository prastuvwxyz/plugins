package controllers

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

const (
	TITLE = "GoPlay chat overlay"
)

func GoplayChatOverlay(c echo.Context) error {
	slug := c.QueryParams().Get("slug")
	env := c.QueryParams().Get("e")
	if env == "" {
		env = "p"
	}

	if slug == "" {
		return c.Render(http.StatusOK, "goplay_chat_overlay.html", map[string]interface{}{
			"title":     TITLE,
			"guard_url": "",
			"env":       "",
			"error":     "404 not found",
		})
	}

	guardURL, err := getGoplayEventDetailBySlugAndEnv(slug, env)
	if err != nil {
		log.Printf("error on get event detail api by slug: %+v, env: %+v, err: %+v", slug, env, err)
		return c.Render(http.StatusOK, "goplay_chat_overlay.html", map[string]interface{}{
			"title":     TITLE,
			"guard_url": "",
			"env":       "",
			"error":     err,
		})
	}

	return c.Render(http.StatusOK, "goplay_chat_overlay.html", map[string]interface{}{
		"title":     TITLE,
		"guard_url": guardURL,
		"env":       env,
		"error":     "",
	})
}
