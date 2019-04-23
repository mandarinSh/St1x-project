defmodule StixServerWeb.UserController do
  use StixServerWeb, :controller

  alias StixServer.Schemas.User
  alias StixServer.Schemas.Dialogue
  alias StixServer.Schemas.Message
  alias StixServer.Repo

  def sign_up(conn, params) do
    case User.create_user(params) do
      {:ok, user} ->
        json(conn |> put_status(:created), %{ok: user})

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to create user"]})
    end
  end

  def sign_in(conn, params) do
    case User.verify_user(params) do
      {:ok, user} ->
        json(conn |> put_status(200), %{ok: user})

      {:error, msg} ->
        json(conn |> put_status(:bad_request), %{error: msg})

      nil -> 
        json(conn |> put_status(:bad_request), %{error: "invalid_parameters"})
    end
  end
  
  def send_message(conn, params) do
    case Message.create_message(params) do
      {:ok, msg} ->
        json(conn |> put_status(200), %{message_sent: ["ok"], msg: msg})

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to send message"]})
    end
  end

  def get_user(conn, params) do
    user = User.get_user(params)

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

  def get_messages_of_dialog(conn, %{"dialogue_id" => dialogue_id}) do
    messages = Message.get_messages(dialogue_id)

    case messages do
      nil -> json(conn |> put_status(404), %{errors: ["no messages in current dialog"]})
      _ -> json(conn |> put_status(200), messages)
    end
  end

  def create_dialogue(conn, %{"sender_id" => sender_id, "receiver_id" => receiver_id}) do
    Dialogue.create_dialogue(sender_id,receiver_id)
    |> case do
      {:ok, msg} -> json(conn |> put_status(:ok), %{status: msg})
      {:error, msg} -> json(conn |> put_status(:error), %{status: "error", msg: msg})
    end
  end
end
