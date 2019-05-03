defmodule StixServerWeb.UserControllerTest do
  use StixServerWeb.ConnCase

  # sign_in?email=only_pass@mail.ru&password=12345

  test "POST /api/sign_in", %{conn: conn} do
    conn = post(conn, "/api/sign_in", %{"email" => "only_pass@mail.ru", "password" => "12345"})

    #IO.inspect json_response(conn, 200)
  end
end
