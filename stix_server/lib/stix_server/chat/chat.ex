defmodule StixServer.Chat do
  import Ecto.Query, only: [from: 2]

  alias StixServer.Schemas.User
  alias StixServer.Schemas.Dialogue
  alias StixServer.Schemas.Message
  alias StixServer.Repo

  def create_message(params) do
    Message.changeset(%Message{}, params) |> Repo.insert
  end

  def get_messages(dialogue_id) do
    (from m in Message, 
      where: (m.dialogue_id == ^dialogue_id),
      select: m) 
      |> Repo.all()
  end

  def create_dialogue(sender_id, reciever_id) do
    arr = [sender_id, reciever_id]
    reverted_arr = [reciever_id, sender_id]

    dialogue = (from d in Dialogue, 
      where: (d.participators == ^arr or d.participators == ^reverted_arr),
      select: d) 
      |> Repo.one()

    case dialogue do
      nil -> 
        changeset = Dialogue.changeset(%Dialogue{}, %{participators: [sender_id, reciever_id]})

        case Repo.insert(changeset) do
          {:ok, struct} -> {:ok, struct}
          {:error, _changeset} -> {:error, "not valid"}
        end

      _ -> {:ok, "dialogue exists"}
    end
  end

  def get_user(%{"nickname" => nickname}) do
    (from u in User,
      where: (u.nickname == ^nickname),
      select: u)
      |> Repo.one()
  end

  def get_user(%{"id" => id}) do
    Repo.get(User, id)
  end

  def get_user(_), do: nil

  def get_last_messages(user_id) do
    (from m in Message,
      order_by: [desc: m.inserted_at],
      where: (m.sender_id == ^user_id) or (m.receiver_id == ^user_id),
      select: m,
      distinct: [m.dialogue_id])
      |> Repo.all()
  end
end