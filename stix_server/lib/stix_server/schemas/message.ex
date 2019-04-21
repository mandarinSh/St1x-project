defmodule StixServer.Schemas.Message do
  use Ecto.Schema
  import Ecto.Changeset

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
end
