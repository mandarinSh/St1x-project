defmodule StixServer.Schemas.Message do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]
  
  alias StixServer.Schemas.Message
  alias StixServer.Repo

  @derive {Jason.Encoder, only: [:id, :message_body, :dialogue_id, :sender_id, :receiver_id]}
  schema "messages" do
    field :message_body, :string
    field :dialogue_id, :id
    field :sender_id, :id
    field :receiver_id, :id

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:message_body, :dialogue_id, :sender_id, :receiver_id])
    |> validate_required([:message_body, :dialogue_id, :sender_id, :receiver_id])
  end

  def create_message(params) do
    Message.changeset(%Message{}, params) |> Repo.insert
  end

  def get_messages(dialogue_id) do
    (from m in Message, 
      where: (m.dialogue_id == ^dialogue_id),
      select: m) 
      |> Repo.all()
  end
end
