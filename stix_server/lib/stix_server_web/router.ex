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

    # socket "/socket.io", StixServerWeb.UserSocket, websocket: true, longpoll: false

    get "/", PageController, :index
  end

  scope "/api", StixServerWeb do
    pipe_through :api

    post "/sign_up", UserController, :sign_up

    post "/sign_in", UserController, :sign_in

    post "/send_message", UserController, :send_message

    post "/create_dialogue", UserController, :create_dialogue

    get "/get_latest_message_of_dialogs_of_user", UserController, :get_latest_message_of_dialogs_of_user
    get "/get_messages_of_dialog", UserController, :get_messages_of_dialog
    get "/get_user", UserController, :get_user
  end

  # Other scopes may use custom stacks.
  # scope "/api", StixServerWeb do
  #   pipe_through :api
  # end
end
