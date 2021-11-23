package routers

import (
	"github.com/labstack/echo/v4"
	"github.com/prastuvwxyz/plugins/controllers"
)

func New(e *echo.Echo) {
	e.GET("/", controllers.Welcome)
	e.GET("/goplay/chat-overlay", controllers.GoplayChatOverlay)
}
