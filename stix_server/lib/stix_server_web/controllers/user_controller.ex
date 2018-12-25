defmodule StixServerWeb.UserController do
  use StixServerWeb, :controller

  def sign_up(conn, params) do
    changeset = StixServer.Schemas.User.changeset(%StixServer.Schemas.User{}, params)

    case StixServer.Repo.insert(changeset) do
      {:ok, user} ->
        json(conn |> put_status(:created), user)

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to create user"]})
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    import Ecto.Query, only: [from: 2]

    alias StixServer.Schemas.User

    query = from u in User, where: u.email == ^email and u.password == ^password, select: u
    results = StixServer.Repo.one(query)

    case results do
      %User{} ->
        json(conn |> put_status(200), %{logged_in: true, user_body: results})

      _ ->
        json(
          conn |> put_status(:bad_request),
          %{logged_in: false, errors: ["invalid email or password", "user not exists"]}
        )
    end
  end

  def send_message(conn, params) do
    changeset = StixServer.Schemas.Message.changeset(%StixServer.Schemas.Message{}, params)

    case StixServer.Repo.insert(changeset) do
      {:ok, msg} ->
        json(conn |> put_status(:message_sent), %{inserted: msg})

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to send message"]})
    end
  end

  def get_user(conn, %{"id" => id}) do
    user = StixServer.Repo.get(StixServer.Schemas.User, id)

    case user do
      nil -> json(conn |> put_status(404), %{errors: ["user not found"]})
      _ -> json(conn |> put_status(200), user)
    end
  end

  def get_latest_message_of_dialogs_of_user(conn, %{"id" => id}) do
    import Ecto.Query, only: [from: 2]

    alias StixServer.Schemas.Message
    alias StixServer.Schemas.User

    subquery = from m in Message,
      where: m.sender_id == ^id,
      select: m#,
      # group_by: m.sender_id

    last_messages = StixServer.Repo.all(subquery)

    case last_messages do
      nil -> json(conn |> put_status(404), %{errors: ["no messages in current dialog"]})
      _ -> json(conn |> put_status(200), last_messages)
    end
  end

  def get_all_messages_of_dialog(conn, %{"sender_id" => sender_id, "subject_id" => subject_id}) do
    import Ecto.Query, only: [from: 2]

    alias StixServer.Schemas.Message

    query = from m in Message, where: (m.sender_id == ^sender_id and m.subject_id == ^subject_id) or (m.sender_id == ^subject_id and m.subject_id == ^sender_id),
      select: m#,
      # order_

    messages = StixServer.Repo.all(query)

    case messages do
      nil -> json(conn |> put_status(404), %{errors: ["no messages in current dialog"]})
      _ -> json(conn |> put_status(200), messages)
    end
  end

  def get_user_by_email(conn, %{"email" => email}) do
    import Ecto.Query, only: [from: 2]

    alias StixServer.Schemas.User

    user = (from u in User,
      where: (u.email == ^email),
      select: u)
      |> StixServer.Repo.all()

    case user do
      nil -> json(conn |> put_status(404), %{errors: ["user not found"]})
      _ -> json(conn |> put_status(200), user)
    end
  end
end
