defmodule StixServer.Schemas.MessageRecipient do
  use Ecto.Schema
  import Ecto.Changeset


  schema "message_recipients" do
    field :is_read, :boolean, default: false
    field :recipient_user_id, :id
    field :recipient_conversation_id, :id
    field :message_id, :id

    timestamps()
  end

  @doc false
  def changeset(message_recipient, attrs) do
    message_recipient
    |> cast(attrs, [:is_read])
    |> validate_required([:is_read])
  end
end
