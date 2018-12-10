defmodule StixServerWeb.Router do
  use StixServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", StixServerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", StixServerWeb do
    pipe_through :api

    get "/users", PageController, :index
    post "/sign_up", UserController, :sign_up

    post "/sign_in", UserController, :sign_in

    post "/send_message", UserController, :send_message
  end

  # Other scopes may use custom stacks.
  # scope "/api", StixServerWeb do
  #   pipe_through :api
  # end
end
