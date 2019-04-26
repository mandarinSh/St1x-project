defmodule StixServer.Schemas.UserConversation do
  use Ecto.Schema
  import Ecto.Changeset


  schema "user_conversations" do
    field :user_id, :id
    field :conversation_id, :id

    timestamps()
  end

  @doc false
  def changeset(user_conversation, attrs) do
    user_conversation
    |> cast(attrs, [])
    |> validate_required([])
  end
end
