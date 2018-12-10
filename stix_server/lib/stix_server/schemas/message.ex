defmodule StixServer.Schemas.Message do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :sender_id, :subject_id]}
  schema "messages" do
    field :message_body, :string
    field :subject_id, :integer
    field :sender_id, :id

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:subject_id, :message_body])
    |> validate_required([:subject_id, :message_body])
  end
end
