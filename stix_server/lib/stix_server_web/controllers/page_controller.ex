defmodule StixServerWeb.PageController do
  use StixServerWeb, :controller

  def index(conn, _params) do
    users = StixServer.Repo.all(StixServer.Schemas.User)

    json(conn_with_status(conn, users), users)#%{ok: true, data: users})
  end

  defp conn_with_status(conn, nil) do
    conn
    |> put_status(:not_found)
  end

  defp conn_with_status(conn, _) do
    conn
    |> put_status(:ok)
  end
end
