defmodule StixServerWeb.UserController do
  use StixServerWeb, :controller

  alias StixServer.Schemas.User
  alias StixServer.Schemas.Dialogue
  alias StixServer.Schemas.Message
  alias StixServer.Repo

  def sign_up(conn, params) do
    changeset = User.changeset(%User{}, params)

    case String.length(params["hashed_password"]) do
      24 ->
        case Repo.insert(changeset) do
          {:ok, user} ->
            json(conn |> put_status(:created), user)
    
          {:error, _changeset} ->
            json(conn |> put_status(:bad_request), %{errors: ["unable to create user"]})
        end

      _ -> json(
          conn |> put_status(:forbidden),
          %{logged_in: false, errors: ["invalid password hash"]}
      )
    end
  end

  def sign_in(conn, %{"nickname" => nickname, "hashed_password" => hashed_password}) do
    import Ecto.Query, only: [from: 2]

    case String.length(hashed_password) do
      24 -> 
        query = from u in User, 
          where: u.nickname == ^nickname and u.hashed_password == ^hashed_password, 
          select: u
        results = Repo.one(query)
        case results do
          %User{} ->
            json(conn |> put_status(200), %{logged_in: true, user_body: results})
    
          _ ->
            json(
              conn |> put_status(:bad_request),
              %{logged_in: false, errors: ["invalid email or password", "user not exists"]}
            )
        end

      _ -> json(
        conn |> put_status(:bad_request),
        %{logged_in: false, errors: ["invalid password hash"]}
      )
    end
  end
  
  # TODO
  def send_message(conn, params) do
    changeset = StixServer.Schemas.Message.changeset(%StixServer.Schemas.Message{}, params)
    
    case Repo.insert(changeset) do
      {:ok, msg} ->
        json(conn |> put_status(200), %{message_sent: ["ok"], msg: msg})

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to send message"]})
    end
  end

  # TODO
  def get_user(conn, %{"id" => id}) do
    user = Repo.get(StixServer.Schemas.User, id)

    case user do
      nil -> json(conn |> put_status(404), %{errors: ["user not found"]})
      _ -> json(conn |> put_status(200), user)
    end
  end

  # TODO
  def get_last_messages_of_user(conn, %{"id" => id}) do
    import Ecto.Query, only: [from: 2]

    subquery = from m in Message,
      select: m,
      where: ((m.sender_id == ^id) or (m.subject_id == ^id))

    # query = from m in Message, where: (m.sender_id == ^sender_id and m.subject_id == ^subject_id) or (m.sender_id == ^subject_id and m.subject_id == ^sender_id),
    # select: m

    query = from m in Message,
      inner_join: msg in subquery(subquery),
      on: msg.id == m.id,
      distinct: [m.subject_id, m.sender_id],
      # distinct: m.subject_id,
      order_by: m.inserted_at,
      select: m


    last_messages = Repo.all(query)

    case last_messages do
      nil -> json(conn |> put_status(404), %{errors: ["no messages in current dialog"]})
      _ -> json(conn |> put_status(200), last_messages)
    end
  end

  # TODO
  def get_all_messages_of_dialog(conn, %{"sender_id" => sender_id, "subject_id" => subject_id}) do
    import Ecto.Query, only: [from: 2]

    query = from m in Message, where: (m.sender_id == ^sender_id and m.subject_id == ^subject_id) or (m.sender_id == ^subject_id and m.subject_id == ^sender_id),
      select: m#,
      # order_

    messages = Repo.all(query)

    case messages do
      nil -> json(conn |> put_status(404), %{errors: ["no messages in current dialog"]})
      _ -> json(conn |> put_status(200), messages)
    end
  end

  def get_user_by_nickname(conn, %{"nickname" => nickname}) do
    user = User.get_user_by_nickname(nickname)

    case user do
      nil -> json(conn |> put_status(404), %{errors: ["user not found"]})
      _ -> json(conn |> put_status(200), user)
    end
  end

  def create_dialogue(conn, [sender_id, reciever_id]) do
    Dialogue.create_dialogue(sender_id,reciever_id)
    |> case do
      {:ok, dialogue} -> json(conn |> put_status(:ok), %{status: "ok"})
      {:error, msg} -> json(conn |> put_status(:error), %{status: "error", msg: msg})
    end
  end
end
